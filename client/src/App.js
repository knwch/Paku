import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import { clearCurrentProfile } from './redux/actions/profileActions';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './components/common/PrivateRoute';

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Post from "./components/pages/Post";
import Rent from "./components/pages/Rent";
import Book from "./components/pages/Book";
import Owner from "./components/pages/Owner";
import Profile from "./components/pages/Profile";
import Support from "./components/pages/Support";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <NavMenu />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/post" component={Post} />
              <PrivateRoute exact path="/rent" component={Rent} />
              <PrivateRoute exact path="/book" component={Book} />
              <Route exact path="/owner" component={Owner} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/support" component={Support} />
              {/* <Route exact path="/not-found" component={NotFound} /> */}
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
