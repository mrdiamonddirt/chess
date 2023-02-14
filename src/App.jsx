import { useState } from 'react'
import './App.css'
import Chessgame from './components/Chessboard'
import Moves from './components/Moves'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
      <div className="App-header">
        <h1>Chess</h1>
      </div>
      <div className="App-body">
      <Chessgame />
      <Moves />
      </div>
    </div>
    </>
  )
}

export default App
