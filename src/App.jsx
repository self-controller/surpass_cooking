import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Testing Connection...')

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(r => r.json())
      .then(data => {setMessage(data.message)})
      .catch(err => setMessage('Connection Failed' + err.message))
  }, [])

  return (
    <div>
      <h1> Cooking App </h1>
      <p>Backend status: {message} </p>
    </div>
  )
}


export default App
