import React from "react";

interface AlertProps {
  type: "success" | "error" | "info";
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertClasses = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
    info: "bg-blue-100 text-blue-700 border-blue-500",
  };

  return (
    <div className={`p-3 rounded-md border-l-4 ${alertClasses[type]}`}>
      {message}
    </div>
  );
};

export default Alert;
