import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
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
        case 'fname':
            setState = setFname;
            break;
        case 'lname':
            setState = setLname;
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
        fname,
        lname,
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
                value={fname}
                onChange={update('fname')}
                placeholder="First Name"
                />
            </label>
            <label>
                <span>Last Name</span>
                <input type="text"
                value={lname}
                onChange={update('lname')}
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
                disabled={!fname || !lname || !username || !password }
            />
        </form>
    );
}

export default SignupForm;