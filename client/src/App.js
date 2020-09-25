import React, { Fragment, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Cars from './components/cars/Cars';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateCar from './components/pages/CreateCar';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import SavedCars from './components/pages/SavedCars';
import AdminHeader from './components/layout/AdminHeader'
import AuthContext from './context/auth/authContext'

const App = () => {

  const { user } = useContext(AuthContext)

  return (
    <Router >
      <Fragment>
        {user?.role === "root" && <AdminHeader />}
        <Navbar />
        <div>
          <Alerts />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/cars' component={Cars} />
            <PrivateRoute exact path='/saved' component={SavedCars} />
            <AdminRoute exact path='/create' component={CreateCar} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  )
}

export default App
