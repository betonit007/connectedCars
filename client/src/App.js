import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Cars from './components/cars/Cars';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateCar from './components/pages/CreateCar';
import PrivateRoute from './components/routing/PrivateRoute';
import SavedCars from './components/pages/SavedCars';
import CarState from './context/cars/carState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import AddState from './context/addCar/AddState';

const App = () => {
  return (

    <AddState>
      <AuthState>
        <CarState>
          <AlertState>
            <Router >
              <Fragment>
                <Navbar />
                <div>
                  <Alerts />
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/cars' component={Cars} />
                    <PrivateRoute exact path='/saved' component={SavedCars} />
                    <PrivateRoute exact path='/create' component={CreateCar} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </CarState>
      </AuthState>
    </AddState>
  )
}

export default App
