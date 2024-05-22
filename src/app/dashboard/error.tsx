"use client";

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  function reset() {
    window.location.reload();
  }

  return (
    <div className="h-[50vh] flex flex-col justify-center items-center mx-auto">
      <h2 className="text-2xl text-red-600">Something went wrong!</h2>
      <p className="text-gray-800">in fetching the data, Please</p>
      <button
        className="bg-red-500 text-white px-4 py-2 my-2 rounded-xl"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
