import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage'
import Home from './Home'

const Routes = () => {
    return (
      <Router>
        <div>
          <nav>
            <div className="left_nav"><Link to="/">Home</Link></div>
            <div className="right_nav">
              <Link to="/home">Login</Link>
              {/* <Link to="/profile">Profile</Link> */}
            </div>
          </nav>
          <main>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={LandingPage} />
            {/* <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <LandingPage />
              </Route>
            </Switch> */}
            
          </main>
        </div>
      </Router>
    );
  };
  
  export default Routes
  