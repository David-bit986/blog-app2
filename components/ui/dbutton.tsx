"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "default" | "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  const variants = {
    default: `
      bg-white text-gray-900 border border-gray-300
      hover:bg-gray-100 active:bg-gray-200
      dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700
      dark:hover:bg-gray-800 dark:active:bg-gray-700
    `,

    primary: `
      bg-black text-white border border-black
      hover:bg-gray-800 active:bg-gray-700
      dark:bg-white dark:text-black dark:border-white
      dark:hover:bg-gray-200 dark:active:bg-gray-300
    `,

    ghost: `
      bg-transparent border border-transparent
      hover:bg-gray-100 active:bg-gray-200
      dark:hover:bg-gray-800 dark:active:bg-gray-700
    `,
  };

  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}