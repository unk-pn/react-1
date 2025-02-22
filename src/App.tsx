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
    <ul key={user.id} className='main'>
      <li><div>{user.userId}</div></li>
      <li><div>{user.id}</div></li>
      <li><div>{user.title}</div></li>
      <li><div>{user.completed ? 'True' : 'False'}</div></li>
      <br />
    </ul>
  )
}

// Дескриптор пример 
// function a<T>(arg: T): { response: T} {
//   const b = {
//     response: arg
//   }
//   return b;
// }

function App() {
  const [res, setRes] = useState<UserResType[] | null>(null);
  const [search, setSearch] = useState('');

  const getUsers = async () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .catch(() => new Promise((resolve) => {resolve({ a: 1 })}))
    .then((data) => setRes(data.slice(0, 5)))
    .finally(() => {})
  }

  useEffect(() => {
    getUsers();
  }, [])
  
  return (
    <>
      <input type="number" value={search} onChange={(e) => {setSearch(e.currentTarget.value)}}/>

      {res ? res.map((v) => formatUser(v)) : null}

    </>
  )
}

export default App