"use client";
import { styles } from "./styles/style";

 

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 font-Poppins justify-center items-center h-screen text-3xl">
      <h2>Something went wrong!</h2>
      <button className={`${styles.primary} text-lg `}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
