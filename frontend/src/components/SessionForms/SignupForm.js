import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
        dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = field => {
        let setState;

        switch (field) {
        case 'firstName':
            setState = setfirstName;
            break;
        case 'lastName':
            setState = setlastName;
            break;
        case 'username':
            setState = setUsername;
            break;
        case 'password':
            setState = setPassword;
            break;
        default:
            throw Error('Unknown field in Signup Form');
        }

        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
        firstName,
        lastName,
        username,
        password
        };

        dispatch(signup(user)); 
    }

    return (
        <form className="session-form" onSubmit={handleSubmit}>
        <h2>Sign Up Form</h2>
        <div className="errors">{errors?.email}</div>
        <label>
            <span>First Name</span>
            <input type="text"
            value={firstName}
            onChange={update('firstName')}
            placeholder="First Name"
            />
        </label>
        <label>
            <span>Last Name</span>
            <input type="text"
            value={lastName}
            onChange={update('lastName')}
            placeholder="Last Name"
            />
        </label>
        <div className="errors">{errors?.username}</div>
        <label>
            <span>Username</span>
            <input type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
            />
        </label>
        <div className="errors">{errors?.password}</div>
        <label>
            <span>Password</span>
            <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
            />
        </label>
        <input
            type="submit"
            value="Sign Up"
            disabled={!firstName || !lastName || !username || !password }
        />
        </form>
    );
}

export default SignupForm;