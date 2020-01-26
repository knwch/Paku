import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import Rent from './pages/Rent';
import Book from './pages/Book';
import Owner from './pages/Owner';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/post' component={Post} />
        <Route path='/rent' component={Rent} />
        <Route path='/book' component={Book} />
        <Route path='/owner' component={Owner} />
        <Route path='/profile' component={Profile} />
        <Route path='/support' component={Support} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;