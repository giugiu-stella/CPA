import React from 'react'
import { useRef, useEffect, useState } from 'react'
import Loader from './components/loader'
import Canvas from './components/canvas'
import './App.css'

type Size = {
  height: number
  width: number
}
const App = () => {
  const [size, setSize] = useState<Size | null>(null)
  const container = useRef<any>()
  useEffect(() => {
    setTimeout(() => {
      setSize({
        height: 780,
        width: 1400,
      })
    }, 100)
  })
  return (
    <div className="App" ref={container}>
      {size ? <Canvas {...size} /> : <Loader />}
    </div>
  )
}

export default App
