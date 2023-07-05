import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session.js';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const userId = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={`/profile/${userId}`}>Profile</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
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
  }

  return (
    <>
      {/* <h1>Smelker</h1> */}
      { getLinks() }
    </>
  );
}

export default NavBar;