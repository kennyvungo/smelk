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
          {/* temp view event link to test */}
          <Link to={`/event/64a36905031eb4776e7f543a`}>View Event1</Link> 
          <Link to={`/event/64a36905031eb4776e7f543b`}>View Event2</Link> 
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <h1>Smelker</h1>
      { getLinks() }
    </>
  );
}

export default NavBar;