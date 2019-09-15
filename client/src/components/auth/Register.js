import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;
    console.log('top error',error);
    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if(error === 'User already exists') {
            setAlert(error, 'text-red-600');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name,
                email,
                password
            });
        }
    }

    return (
      <div className='flex justify-center w-full'>

        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3 md:w-1/2">
          <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Name</label>
              <input className='shadow appearance-none border-rounded w-full'
                  type='text'
                  name='name'
                  value={name}
                  onChange={onChange}
                  required
            />
        </div>
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
        <div className=''>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
          <input className='shadow appearance-none border-rounded w-full'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className=''>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Confirm Password</label>
          <input className='shadow appearance-none border-rounded w-full mb-4'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
        />
      </form>
    </div>
    )
}

export default Register;
