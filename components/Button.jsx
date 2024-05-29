import Link from "next/link";
import React from "react";

const Button = ({ text, bgColor, textColor, category }) => {
  return (
    <Link href={`/search?category=${category}`}>
      <button
        className={`${bgColor} ${textColor} cursor-pointer hover:scale-105 duration-300  px-8 py-2 bgColor rounded-full z-50`}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
