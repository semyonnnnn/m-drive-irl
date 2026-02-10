import { InputHTMLAttributes } from "react";

export default function Radio({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="radio"
      className={
        "rounded-sm cursor-pointer text-accent-main shadow-sm border-gray-700 bg-gray-900 focus:ring-accent-main focus:ring-offset-gray-800 " +
        className
      }
    />
  );
}
