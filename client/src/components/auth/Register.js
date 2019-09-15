import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            console.log('isAuthenticated')
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
      <div className='container flex justify-center'>

      <form onSubmit={onSubmit}>
        <div className=''>
            <label htmlFor='email'>Name</label>
            <input 
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                required
            />
        </div>
        <div className=''>
          <label htmlFor='email'>Email Address</label>
          <input 
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className=''>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className=''>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className=''
        />
      </form>
    </div>
    )
}

export default Register;
