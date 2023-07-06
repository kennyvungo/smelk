import React from 'react';
import './SideBar.css'

function Sidebar({ children }) {

    return (
      <div className='sidebar'>
        {children}
      </div>
    );
  }
  
export default Sidebar;