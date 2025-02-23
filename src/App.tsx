// Дескриптор пример 
// function a<T>(arg: T): { response: T} {
//   const b = {
//     response: arg
//   }
//   return b;
// }

import { useEffect, useState } from 'react'
import './App.css'

type UserResType = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

const formatUser = (user: UserResType) => {
  return (
    <ul
    key={user.id}
    className='main'
    style={{backgroundColor: user.completed ? '#B9CEAC' : '#AB4E52'}}
    >
      {/* <li><div>{user.userId}</div></li> */}
      {/* <li><div>{user.id}</div></li> */}
      <li><div>{user.title}</div></li>
      {/* <li><div>{user.completed ? 'True' : 'False'}</div></li> */}
      <br />
    </ul>
  )
}

function App() {
  const [res, setRes] = useState<UserResType[]>([]);
  const [search, setSearch] = useState('');
  const filteredUsers = res.filter(i => search !== '' && i.userId === Number(search));

  const getUsers = async () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .catch(() => new Promise((resolve) => {resolve({ a: 1 })}))
    .then((data) => setRes(data))
    .finally(() => {})
  }

  useEffect(() => {
    getUsers();
  }, [])
  
  return (
    <>
      <input
        type="number"
        placeholder='Enter user ID'
        value={search}
        onChange={(e) => {setSearch(e.target.value)}}
        className='main-input'
      />
      <div className='notes'>
        {filteredUsers.length > 0 ? (filteredUsers.map(formatUser)) : <p>No users found</p>}
      </div>
    </>
  )
}

export default App