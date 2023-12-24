interface Props {
  progress: number;
}

const CourseProgress = ({ progress }: Props) => {
  // Calculate the width of the progress bar based on the completion percentage
  const progressBarWidth = progress ? `${progress}%` : "0";

  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <div
          className={`h-2.5 rounded-full ${
            progress === 0 ? "" : "bg-blue-600"
          }`}
          style={{ width: progressBarWidth }}
        />
      </div>
      <p className="flex items-center gap-2 mt-2">
        <span className="font-semibold">{progress || 0}%</span>
        Completed
      </p>
    </>
  );
};

export default CourseProgress;
