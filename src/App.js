import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: []
  }

  constructor(props) {
    super(props)
    this.getUsers()
  }

  getUsers = async() => {
    try {
      const res = await fetch('http://localhost:7000/users')
      const result = await res.json()
      this.setState({
        users: result.users
      })
    } catch (e) {
      console.log("ERROR IS", e)
    }
  }

  render() {
    return (
      <div>
        {
          this.state.users.map((u, key) => <UserCard user={u} key={`user-${key}`}/>)
        }
      </div>
    )
  }
}

function UserCard({ user }) {
  return (
    <div>
      {user.firstname} {user.lastname}
    </div>
  )
}

export default App;
