import { ApolloProvider } from '@apollo/react-hooks';
import React, { Component } from 'react';
import client from './graphql/client'
import { getLoggedInUser, logout } from './auth';
import Chat from './Chat';
import Login from './Login';
import NavBar from './NavBar';

class App extends Component {
  state = {user: getLoggedInUser()};

  handleLogin(user) {
    this.setState({user});
  }

  handleLogout() {
    logout();
    this.setState({user: null});
  }

  render() {
    const {user} = this.state;
    if (!user) {
      return <Login onLogin={this.handleLogin.bind(this)} />; //login doesnt need graphql
    }
    return (
      <ApolloProvider client={client}> {/*makes apollo client instance available to all react componenets*/}
        <NavBar onLogout={this.handleLogout.bind(this)} />
        <Chat user={user} />
      </ApolloProvider>
    );  
  }
}

export default App;
