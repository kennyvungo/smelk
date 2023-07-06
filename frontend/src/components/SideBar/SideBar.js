import React from 'react';
import './SideBar.css'
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onClose, children }) {
    const sidebarClass = isOpen ? 'sidebar open' : 'sidebar';

    return (
      <div className={sidebarClass}>
         <Link to={`/profile`} className='profile'>X</Link>
        {children}
      </div>
    );
  }
  
  export default Sidebar;