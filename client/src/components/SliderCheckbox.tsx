import React from "react";
import { useRememberMe } from "../store/rememberMe";

const SliderCheckbox = () => {
  const {rememberMe, setRememberMe} = useRememberMe();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <label className="cursor-pointer">
        <input 
          type="checkbox"
          checked={rememberMe}
          id="rememberMe"
          onChange={handleChange}
          className="hidden"
        />
        <span
            className={`w-13 h-7 rounded-full flex items-center justify-between p-1 transition-all ease-in-out duration-400 ${
              rememberMe ? "bg-secondary" : "bg-gray-400"
            }`}>
            <span
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-400 ${
                rememberMe ? "transform translate-x-6" : ""
              }`}>
              </span>
          </span>
      </label>  
      <span className="text-sm font-normal font-display text-secondary">
        Remember me
      </span>
    </div>
  );
};

export default SliderCheckbox;
