import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/cars');
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'text-red-600');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'text-red-600');
        } else {
            login({
                email,
                password
            })
        }
    };

    return (
        <div className='w-full'>
          <div className="text-2xl text-center m-4">Login</div>
    
      <form onSubmit={onSubmit} className="m-auto bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3 lg:w-1/2">
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email Address</label>
          <input className='shadow appearance-none border-rounded w-full'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
          <input className='shadow appearance-none border-rounded w-full'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
        <input
          type='submit'
          value='Login'
          className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
        />
        </div>
      </form>
    </div>
    )
}

export default Login;