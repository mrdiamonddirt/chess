import { useState } from 'react'
import './App.css'
import Chessgame from './components/Chessboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Chessgame />
    </div>
  )
}

export default App
