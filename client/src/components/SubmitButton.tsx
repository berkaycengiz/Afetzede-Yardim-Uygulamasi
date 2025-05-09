import React from "react";

interface SubmitButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, onClick, style, disabled }) => {
  return (
    <button
    type="submit"
    onClick={onClick}
    style={style}
    disabled={disabled}
    className={`w-full font-display flex flex-col items-center bg-secondary text-white py-2 rounded font-normal transition ${
      disabled
        ? 'opacity-50'
        : 'hover:bg-hover cursor-pointer'
    }`}>
        {children}
    </button>
  );
};

export default SubmitButton;
