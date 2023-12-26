import { styles } from "@/app/styles/style";

interface Props {
  name: string;
  image?: string;
}

const CommunityCard = ({name,image}: Props) => {
  return (
    <div className={`${styles.blue_btn} w-full p-5 flex gap-5 items-center`}>
        <div className="w-[40px] h-[40px] rounded-full bg-gray-300 text-light-primary font-bold flex justify-center items-center">C</div>
      <h1 className="font-Josefin text-xl">{name}</h1>
    </div>
  );
};

export default CommunityCard;
