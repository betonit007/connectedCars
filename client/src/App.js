import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <div>
     <Router >
            <Fragment>
            <div className="bg-blue-100">Hello World!</div>
              <Navbar />
              <div>
                {/* <Alerts /> */}
                <Switch>
                  {/* <Route exact path='/' component={Home} />
                  {/* <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} /> */}
                </Switch>
              </div>
            </Fragment>
          </Router>
    </div>
  )
}

export default App
