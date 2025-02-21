import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type UserResType = {
  id: number,
  email: string,
}

const formatUser = (user: UserResType) => {
  return (
    <div key={user.id}>
      <div>{user.email}</div>
      <div>{user.id}</div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0);
  const [res, setRes] = useState<UserResType[] | null>(null);

  const buttonClick = () => {
    setCount((c) => c + 1)
  }

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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {res ? res.map((v) => formatUser(v)) : null}
      <div className="card"></div>
        <button onClick={buttonClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
