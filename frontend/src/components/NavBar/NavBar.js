import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session.js';
import { useState } from 'react';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const userId = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // const getLinks = () => {
  //     return (
  //       <>
  //       </>
  //     );
  // }

  return (
    <>
      {loggedIn ? (
          <div className="links-user">
            <div className='links-user-container'>
              <Link to={`/profile/${userId}`} isOpen={showSidebar} onClick={() => toggleSidebar} className='profile'>Profile</Link>
              <div className='profile2' onClick={logoutUser}>Logout</div>
              <Link className='profile2' to={'/about'} >About</Link>
            </div>
          </div>
      ) : (
        <div className='links-auth-container'>
                <div className="links-auth">
                    <Link to={'/signup'} className="link1-auth">Signup</Link>
                    <Link to={'/login'} className="link2-auth">Login</Link>
                    <Link to={'/about'} className='about-link'>About</Link>
                    <Link to={'/'} className='about-link'>Home</Link>
                </div>
        </div>
      )}
    </>
  );
}


export default NavBar;

