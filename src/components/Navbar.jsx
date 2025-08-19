import React, { useState } from 'react';
import './Navbar.css'; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
    
    if (tab === 'add') {
      setTimeout(() => {
        document.querySelector('input[type="text"]').focus();
      }, 100);
      window.dispatchEvent(new CustomEvent('showAll'));
    } else {
      window.dispatchEvent(new CustomEvent(`show${tab.charAt(0).toUpperCase() + tab.slice(1)}`));
    }
  };

  return (
    <nav className="navbar">
      <div className="navdiv w-[95%] md:w-4/5 lg:w-3/4 mx-auto bg-inherit">
        <div className="flex items-center gap-2 bg-inherit">
          <svg className="rounded bg-inherit" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#32064A" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="6" height="6" rx="1" />
            <path d="m3 17 2 2 4-4" />
            <path d="M13 6h8" />
            <path d="M13 12h8" />
            <path d="M13 18h8" />
          </svg>
          <span className="text-white text-xl font-semibold bg-inherit">Todo List</span>
        </div>
        <div className="hamburger-icon" onClick={toggleMenu}>&#9776;</div>
        <ul className={`nav-links bg-inherit ${isOpen ? 'open' : ''}`}>
          <li>
            <button 
              onClick={() => handleTabClick('all')}
              className={`px-6 py-2 rounded-md transition-all duration-200 text-white hover:bg-[#622385] hover:scale-105`}
            >
              All Tasks
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleTabClick('completed')}
              className={`px-6 py-2 rounded-md transition-all duration-200 text-white hover:bg-[#622385] hover:scale-105`}
            >
              Completed
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleTabClick('add')}
              className={`px-6 py-2 rounded-md transition-all duration-200 text-white hover:bg-[#622385] hover:scale-105`}
            >
              Add Task
            </button>
          </li>
        </ul>
      </div>

    </nav>
  );
}

export default Navbar;