import React from "react";

interface CircleButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const CircleButton: React.FC<CircleButtonProps> = ({ onClick, children, style, disabled }) => {
  return (
    <button
    type="button"
    onClick={onClick}
    style={style}
    disabled={disabled}
    className={`w-10 h-10 font-display flex flex-col items-center self-center rounded-full bg-secondary text-white justify-center font-normal transition ${
      disabled
        ? 'opacity-50'
        : 'hover:bg-hover hover:cursor-pointer'
    }`}>
        {children}
    </button>
  );
};

export default CircleButton;