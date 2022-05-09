import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUsers = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(name, email)


    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data);
      })
  }


  return (
    <div className="App">
      <h1>My First react with node</h1>
      <p>Users: {users.length}</p>
      <form onSubmit={handleAddUsers}>
        <input type="text" name="name" placeholder='Name' required />
        <input type="text" name="email" placeholder='Email' required />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Id: {user.id}, Name: {user.name}, email:{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
