"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import uploadImage from "@/app/utils/upload-image";
import { IMessage } from "@/@types/interfaces/realtime/chat.interface";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_REALTIME_SRV_URL!);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: IMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  // Function to send the image in the chat
  const sendImage = async () => {
    if (socket && selectedImage) {
      const downloadURL = await uploadImage(selectedImage);
      // Emit a message containing the image URL
      socket.emit("chatMessage", roomId, {
        senderId: user._id,
        messageType: "image",
        fileUrl: downloadURL,
        timestamp: Date.now(),
      });

      setSelectedImage(null); // Clear the selected image after sending
    }
  };

  // send msg
  const sendMessage = (e: any) => {
    e.preventDefault();
    setShowEmojiPicker(false);
    if (socket && messageInput.trim() !== "") {
      socket.emit("chatMessage", roomId, {
        content: messageInput,
        senderId: user._id,
        messageInput: "text",
        timestamp: Date.now(),
      });
      setMessageInput("");
      setSelectedImage(null);
    }
  };

  // send msg
  const joinRoom = () => {
    if (socket && roomId.trim() !== "") {
      socket.emit("joinRoom", roomId);
      setJoinedRoom(true);
    }
  };

  // add emoji
  const addEmoji = (emojiObject: any) => {
    const { emoji } = emojiObject;
    setMessageInput((prevMessageInput) => prevMessageInput + emoji);
  };

  // scroll to bottom
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToBottom();
  }, [messages]);
  // scroll to bottom

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between ">
      <div className="p-4 border-b border-gray-300 flex justify-center">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID..."
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={joinRoom}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Join Room
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto px-4 py-2 ">
        {messages.map((message: IMessage, index: number) => (
          <div
            key={index}
            className={`flex items-start ${
              message.senderId === user._id ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`p-3 relative rounded-lg ${
                message.senderId === user._id
                  ? "bg-gradient-to-tr from-[#273770] to-[#355ba2] text-white font-Poppins w-[300px]"
                  : "bg-gradient-to-tr from-[#e15536] to-[#db593c] text-white font-Poppins w-[300px]"
              }`}
            >
              <Image
                src={message.senderId === user._id ? user.avatar : ""}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full absolute right-2 top-2"
              />
              {message?.messageType === "image" ? (
                <Image
                  src={message.fileUrl}
                  alt="chat-img"
                  className="max-w-xs max-h-48"
                  width={100}
                  height={100}
                />
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
              <span className="text-xs text-gray-400">
                {message.senderId === user._id ? "You" : message.senderId} -{" "}
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </ul>

      {selectedImage && (
        <div className="p-4">
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            width={200}
            height={200}
            className="rounded-md "
          />
          <button
            onClick={sendImage}
            className="bg-blue-500 text-white mt-2 p-2 rounded-md"
          >
            <IoSend />
          </button>
        </div>
      )}

      {showEmojiPicker && (
        <div className="absolute bottom-20 left-6">
          <EmojiPicker onEmojiClick={addEmoji as any} />
        </div>
      )}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-gray-300 relative flex items-center"
      >
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 focus:outline-none text-3xl"
        >
          <MdEmojiEmotions />
        </button>
        <label
          htmlFor="imageUpload"
          className="p-2 cursor-pointer focus:outline-none text-3xl"
        >
          <IoMdPhotos />
        </label>

        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-md"
        />
        {/* Image upload input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <button
          type="submit"
          className="p-2 px-8 ml-2 rounded-md bg-blue-500 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
