import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './HomePage';
import UsersPage from './UsersPage';
import SingleUserPage from './SingleUserPage';


class App extends Component {


  state = {
    route: window.location.hash.substr(1),
  };

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }
  
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/users/:id" component={SingleUserPage} />
      </Router>
    );
  }
}


export default App;
