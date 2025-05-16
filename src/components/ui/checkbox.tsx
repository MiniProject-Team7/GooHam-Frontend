"use client";

import React from "react";

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  className = "",
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      className={`w-4 h-4 cursor-pointer ${className}`}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  );
};
