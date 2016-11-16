import React, { Component, PropTypes } from 'react';

class UsersTable extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>hi</th>
            <th>hi</th>
            <th>hi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ho</td>
            <td>ho</td>
            <td>ho</td>
          </tr>
          <tr>
            <td>ha</td>
            <td>ha</td>
            <td>ha</td>
          </tr>
          <tr>
            <td>he</td>
            <td>he</td>
            <td>he</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class UsersPage extends Component {

  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    // fetch `/api/users` to get users and then set state...
    fetch('/api/users/').then(res => res.json())
    .then(json => {
      this.setState({ users: json });
    });
  }

  render() {
    return (
      <table className="table table-responsive">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user, id) => {
            const keys = Object.keys(user);
            return (
              <tr>
                {keys.map(key => (
                  <td>
                    <a href={`#/users/${id + 1}`}>{user[key]}</a>
                  </td>))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default UsersPage;
