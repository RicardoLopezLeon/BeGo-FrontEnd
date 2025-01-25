import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './stilos/generales.css'
import CargoOrders from './components/CargoOrders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='tema'>
        <CargoOrders />
      </div>
    </>
  )
}

export default App
