import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SessionForm.css';
import { FaExclamation } from "react-icons/fa"

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'username' ? setUsername : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password })); 
  }

  const handleDemoSignIn = async (e) => {
    e.preventDefault();
    dispatch(login({ username: "demo-user" , password: "password" }))
  };



  return (
    <form className="session-form" onSubmit={handleSubmit}>
        <div className='login-background'>
            <h2 className='login-title'>Log In</h2>
            <label>
                <span className='login-username-container'>
                    <span className='login-username'>Username</span>
                    <input className='login-username-box'type="text"
                    value={username}
                    onChange={update('username')}
                    placeholder="Username"
                    />
                </span>
            </label>
            <label>
                <span className='login-password-container'>
                    <span className='login-password'>Password</span>
                    <input className='login-password-box' type="password"
                    value={password}
                    onChange={update('password')}
                    placeholder="Password"
                    />
                </span>
            </label>
            <div className="errors">
              {errors ? <FaExclamation /> : null}
              {errors?.username}
            </div>
            {/* <div className="errors">{errors?.password}</div> */}
            <div className='login-button-container'>
                <input className='login-button'
                    type="submit"
                    value="Login"
                    disabled={!username || !password}
                />
            </div>

            <div className="demo-button-container" onClick={handleDemoSignIn}>
                <button className='demo-button'>Sign In With Demo </button>
            </div>
        </div>
    </form>
  );
}

export default LoginForm;