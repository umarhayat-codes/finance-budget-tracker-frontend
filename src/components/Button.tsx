import React from "react";
import { ButtonProps } from "../../types";

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      className={`flex items-center gap-2 transition-all ${className}`}
      {...props}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
};

export default Button;
