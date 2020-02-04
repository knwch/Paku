import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Post from "./components/pages/Post";
import Rent from "./components/pages/Rent";
import Book from "./components/pages/Book";
import Owner from "./components/pages/Owner";
import Profile from "./components/pages/Profile";
import Support from "./components/pages/Support";
import Navbar from "./components/Navbar";
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
    // TODO: Clear current Profile
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/post" component={Post} />
              <Route exact path="/rent" component={Rent} />
              <Route exact path="/book" component={Book} />
              <Route exact path="/owner" component={Owner} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/support" component={Support} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
