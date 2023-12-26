import { IoMdPhotos } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";

interface Props {
  sendMessage: (e: React.FormEvent) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: ({ showEmojiPicker }: any) => void;
  messageInput: string;
  setMessageInput: ({ e }: any) => void;
  handleImageUpload: ({ target }: any) => void;
}

const CommunityInput = ({
  sendMessage,
  setShowEmojiPicker,
  showEmojiPicker,
  messageInput,
  handleImageUpload,
  setMessageInput,
}: Props) => {
  return (
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
  );
};

export default CommunityInput;
