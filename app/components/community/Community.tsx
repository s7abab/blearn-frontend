"use client";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import uploadImage from "@/app/utils/upload-image";
import { IMessage } from "@/@types/interfaces/realtime/chat.interface";
import { useParams } from "next/navigation";
import SOCKET from "@/app/utils/socket-connection";
import CommunityInput from "./CommunityInput";
import ChatCard from "./ChatCard";
import { SOCKET_EVENTS } from "@/@types/enums/socketEvents.enum";
import scrollToBottom from "@/app/utils/scroll-to-bottom";
import ImagePreview from "./ImagePreview";
import BackButton from "../common/BackButton";
import { useGetMessagesQuery } from "@/redux/features/realtime/realtimeApi";
import Loader from "../common/spinners/Loader";

const Community: React.FC = () => {
  const { id } = useParams<any>();
  const [roomId, setRoomId] = useState<string>(id);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { user } = useSelector((state: any) => state.auth);
  const { data: messagesD, isLoading } = useGetMessagesQuery(id);
  const messagesData = messagesD?.messages;
  // Update messages state when data changes
  useEffect(() => {
    if (messagesData?.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...messagesData]);
    }
  }, [messagesData]);
  // send image
  const sendImage = async () => {
    if (SOCKET && selectedImage) {
      const downloadURL = await uploadImage(selectedImage);
      SOCKET.emit(SOCKET_EVENTS.CHAT_MESSAGE, roomId, {
        chatRoomId: id,
        senderId: user._id,
        messageType: "image",
        fileUrl: downloadURL,
        timestamp: Date.now(),
      });

      setSelectedImage(null);
    }
  };

  // send msg
  const sendMessage = (e: any) => {
    e.preventDefault();
    setShowEmojiPicker(false);
    if (SOCKET && messageInput.trim() !== "") {
      SOCKET.emit(SOCKET_EVENTS.CHAT_MESSAGE, roomId, {
        chatRoomId: id,
        content: messageInput,
        senderId: user._id,
        messageInput: "text",
        timestamp: Date.now(),
      });
      setMessageInput("");
      setSelectedImage(null);
    }
  };

  // add emoji
  const addEmoji = (emojiObject: any) => {
    const { emoji } = emojiObject;
    setMessageInput((prevMessageInput) => prevMessageInput + emoji);
  };
  // image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
    }
  };
  // join room
  useEffect(() => {
    if (SOCKET && roomId.trim() !== "") {
      SOCKET.emit(SOCKET_EVENTS.JOIN_ROOM, roomId);
    }
  }, [roomId]);

  // scroll to bottom
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScrollToBottom = () => {
      scrollToBottom(chatEndRef.current);
    };
    handleScrollToBottom();
  }, [messages]);

  // show messages
  useEffect(() => {
    if (SOCKET) {
      const messageHandler = (message: IMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };
      SOCKET.on(SOCKET_EVENTS.MESSAGE, messageHandler);

      return () => {
        SOCKET.off(SOCKET_EVENTS.MESSAGE, messageHandler);
      };
    }
    // eslint-disable-next-line
  }, [SOCKET]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col h-screen justify-between ">
      {user?.role === "user" ? (
        <BackButton location="/my-learnings" />
      ) : (
        <BackButton location="/instructor/community" />
      )}
      <div className="p-4 border-b border-gray-300 flex justify-center">
        <h1>Community</h1>
      </div>
      <ul className="flex-1 overflow-y-auto px-4 py-2 ">
        <ChatCard messages={messages} user={user} />
        <div ref={chatEndRef}></div>
      </ul>
      <ImagePreview selectedImage={selectedImage} sendImage={sendImage} />
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-6">
          <EmojiPicker onEmojiClick={addEmoji as any} />
        </div>
      )}
      <CommunityInput
        handleImageUpload={handleImageUpload}
        messageInput={messageInput}
        sendMessage={sendMessage}
        setMessageInput={setMessageInput}
        setShowEmojiPicker={setShowEmojiPicker}
        showEmojiPicker={showEmojiPicker}
      />
    </div>
  );
};

export default Community;
