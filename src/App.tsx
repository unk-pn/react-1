// Дескриптор пример 
// function a<T>(arg: T): { response: T} {
//   const b = {
//     response: arg
//   }
//   return b;
// }

import { TODOS } from './todos';
import { useEffect, useState } from 'react'
import './App.css'

type UserResType = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

const formatUser = (setRes, res, user: UserResType) => {
  return (
    <div
      onClick={(e) => {
        setRes();
      }}
      key={user.id}
      className='note-item'
      style={{backgroundColor: user.completed ? '#B9CEAC' : '#AB4E52'}}
    >
      <div className='note-content'>{user.title}</div>
    </div>
  )
}

function App() {
  const [res, setRes] = useState<UserResType[]>([]);
  const [search, setSearch] = useState('');
  const filteredUsers = res.filter(i => search !== '' && i.userId === Number(search));

  const getUsers = async () => {
    const response = new Promise((resolve) => {
        resolve(TODOS);
    })
    // fetch('https://jsonplaceholder.typicode.com/todos')
    response
    // .then((res) => res.json())
    .catch(() => new Promise((resolve) => {resolve({ a: 1 })}))
    .then((data) => setRes(data as unknown as UserResType[]))
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
        {filteredUsers.length > 0 ? (filteredUsers.map((value) => formatUser(setRes, res, value)))
        : <p>No users found</p>}
      </div>
    </>
  )
}

export default App