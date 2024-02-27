import React from "react";

const CustomButton = ({
  text,
  bgColor,
  textColor,
  hoverColor,
  telegramUrl,
  width,
}) => {
  const handleApplyJobClick = () => {
    window.location.href = telegramUrl;
  };
  return (
    <button
      className={`p-3 bg-${bgColor} text-${textColor} hover:text-${hoverColor} md:px-10 rounded-lg w-${width}`}
      onClick={handleApplyJobClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
