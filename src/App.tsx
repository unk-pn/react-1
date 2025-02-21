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
    <div key={user.id} className='main'>
      <div>{user.userId}</div>
      <div>{user.id}</div>
      <div>{user.title}</div>
      <div>{user.completed ? 'True' : 'False'}</div>
      <br />
    </div>
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
      
      {res ? res.map((v) => formatUser(v)) : null}

    </>
  )
}

export default App
