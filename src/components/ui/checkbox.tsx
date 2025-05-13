"use client";

import React from "react";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  className = "",
}) => {
  return (
    <input
      type="checkbox"
      className={`w-4 h-4 cursor-pointer ${className}`}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  );
};
