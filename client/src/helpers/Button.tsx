'use client';

import { Button } from "@/types/Button";
import React from "react";

/**
 * Custom Button created with tailwind
 */
const Button: React.FC<Button> = ({ title, setIsOpen, containerClass }) => {
  return (
    <div className={containerClass} >
      <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm`} onClick={() => { setIsOpen(true) }}>
        {title}
      </button>
    </div>
  )
}

export default Button;
