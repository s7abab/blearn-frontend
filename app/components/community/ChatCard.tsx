import { IMessage } from "@/@types/interfaces/realtime/chat.interface";
import { IUser } from "@/@types/interfaces/user/user.interface";
import Image from "next/image";

interface Props {
  messages: IMessage[];
  user: IUser;
}

const ChatCard = ({ messages, user }: Props) => {
  return (
    <>
      {messages.map((message: IMessage, index: number) => (
        <div
          key={index}
          className={`flex items-start ${
            message.senderId === user._id ? "justify-end" : "justify-start"
          } mb-4`}
        >
          <div
            className={`p-3 rounded-lg ${
              message.senderId === user._id
                ? "bg-gradient-to-tr from-[#273770] to-[#355ba2] text-gray-100 font-Poppins w-[300px] shadow-md"
                : "bg-gradient-to-tr from-[#c9cbe1] to-[#d2ddf9] text-gray-900 font-Poppins w-[300px] shadow-md"
            }`}
          >
            {/* {message.senderId === user._id ? "You" : message.senderId} -{" "} */}
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
            <span className="text-xs flex justify-end">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatCard;
