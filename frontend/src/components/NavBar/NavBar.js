import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session.js';
import { useState } from 'react';
import Sidebar from '../SideBar/SideBar';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const getLinks = () => {
      return (
        <>
            <div className='links-auth-container'>
                <div className="links-auth">
                    <Link to={'/signup'} className="link1-auth">Signup</Link>
                    <Link to={'/login'} className="link2-auth">Login</Link>
                    <Link to={'/about'} className='about-link'>About</Link>
                    <Link to={'/'} className='about-link'>Home</Link>
                </div>
            </div>
        </>
      );
    }
    
    return (
      <>
      {loggedIn && user ? (
        <div className="links-nav">
            <div className='links-auth-container'>
            <Link to={'/about'} className='about-link'>About</Link>
            <Link to={`/profile/${user["_id"]}`} isOpen={showSidebar} onClick={() => toggleSidebar} className='profile'>Profile</Link>
            <button onClick={logoutUser}>Logout</button>
            </div>
          </div>
      ) : (
        getLinks()
      )}
    </>
  );
}


export default NavBar;

