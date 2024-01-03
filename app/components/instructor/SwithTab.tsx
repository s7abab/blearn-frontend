type Props = {
  handleClick: (arg: string) => void;
};

const SwitchTab = ({ handleClick }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          onClick={() => handleClick("overview")}
          className="dark:bg-gradient-to-br dark:from-[#0c214d] dark:to-[#051536] p-4 rounded-md shadow-md font-Josefin dark:hover:from-[#11295d] dark:hover:to-[#0c214d cursor-pointer border-r-2 border-r-gray-100 bg-white"
        >
          Course Overview
        </div>
        <div
          onClick={() => handleClick("contents")}
          className="dark:bg-gradient-to-br dark:from-[#0c214d] dark:to-[#051536] p-4 rounded-md shadow-md font-Josefin dark:hover:from-[#11295d] dark:hover:to-[#0c214d cursor-pointer border-r-2 border-r-gray-100 bg-white"
        >
          Course Contents
        </div>
        <div
          onClick={() => handleClick("edit")}
          className="dark:bg-gradient-to-br dark:from-[#0c214d] dark:to-[#051536] p-4 rounded-md shadow-md font-Josefin dark:hover:from-[#11295d] dark:hover:to-[#0c214d cursor-pointer border-r-2 border-r-gray-100 bg-white"
        >
          Edit Course
        </div>
      </div>
    </div>
  );
};

export default SwitchTab;
