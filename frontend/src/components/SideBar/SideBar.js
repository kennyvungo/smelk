import React from 'react';
import './SideBar.css'

function Sidebar({ children }) {

    return (
      <>
        <div className='sidebar-container'>
          <div className='sidebar'>
            {children}
          </div>
        </div>
      </>
    );
  }
  
export default Sidebar;