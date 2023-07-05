import React from 'react';
import './SideBar.css'

function Sidebar({ isOpen, onClose, children }) {
    const sidebarClass = isOpen ? 'sidebar open' : 'sidebar';

    return (
      <div className={sidebarClass}>
        <button className="sidebar-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    );
  }
  
  export default Sidebar;