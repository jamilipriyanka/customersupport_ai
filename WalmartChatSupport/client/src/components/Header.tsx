import React from 'react';
import { X } from 'lucide-react';

interface HeaderProps {
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
  return (
    <header className="bg-[#0071dc] text-white py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-10">
      <div className="flex items-center">
        <span className="bg-yellow-400 text-xs font-bold text-[#0071dc] px-2 py-0.5 rounded mr-2">NEW</span>
        <h1 className="text-lg font-bold">Walmart Support</h1>
      </div>
      <button 
        onClick={onClose}
        className="text-xl focus:outline-none"
        aria-label="Close support window"
      >
        <X className="h-5 w-5" />
      </button>
    </header>
  );
};

export default Header;
