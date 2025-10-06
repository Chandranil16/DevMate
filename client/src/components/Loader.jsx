import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[8rem] sm:min-h-[10rem] md:min-h-[12rem] p-4">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 sm:border-3 md:border-4 border-blue-400 border-t-transparent rounded-full animate-spin shadow-md sm:shadow-lg"></div>
    </div>
  );
}