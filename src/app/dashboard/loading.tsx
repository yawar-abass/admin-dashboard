import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="h-[50vh] flex-col flex items-center justify-center mx-auto">
      <h1 className="text-3xl  font-bold"> Loading Books...</h1>
      <p className="text-sm text-gray-800 mb-2 ">
        {" "}
        Please wait it may take a bit more time to load the books
      </p>
      <CircularProgress />
    </div>
  );
};

export default Loading;
