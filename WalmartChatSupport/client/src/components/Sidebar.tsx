import React from 'react';
import { categories } from '../lib/supportData';

interface SidebarProps {
  onCategorySelect: (categoryId: string) => void;
  activeCategory: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, activeCategory }) => {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 overflow-auto h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-gray-800">Help Categories</h2>
      </div>
      
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="border-b border-gray-100">
              <button 
                className={`w-full px-6 py-3 text-left flex items-center hover:bg-gray-50 transition ${
                  activeCategory === category.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => onCategorySelect(category.id)}
              >
                <i className={`fas fa-${category.icon} mr-4 text-[#0071dc]`}></i>
                <span>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
