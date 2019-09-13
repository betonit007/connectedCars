import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Cars from './components/cars/Cars.js';
import Login from './components/auth/Login';

import CarState from './context/cars/carState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (

    <AuthState>
      <CarState>
        <AlertState>
          <Router >
            <Fragment>
              <Navbar />
              <div>
                {/* <Alerts /> */}
                <Switch>
                  <Route exact path='/' component={Cars} />
                  {/* <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />*/}
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </CarState>
    </AuthState>

  )
}

export default App
