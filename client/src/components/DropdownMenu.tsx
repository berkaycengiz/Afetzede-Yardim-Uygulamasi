import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  trigger: React.ReactElement;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="inline-block w-full cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute w-30 rounded-md shadow-lg bg-background ring-2 ring-primary z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="" role="none">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="text-highlight flex items-center w-full text-left rounded-md cursor-pointer px-4 py-2 text-sm hover:bg-hover transition"
                role="menuitem"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;