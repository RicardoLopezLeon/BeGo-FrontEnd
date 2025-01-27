import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './stilos/generales.css'
import CargoOrders from './components/CargoOrders'
import { OrdenesApi } from './consumoapis/OrdenesApi'
import CargoDetails from './components/CargoDetails';

function App() {

  
  const [ordenes, setOrdenes] = useState()

  useEffect(() => {
    const fetchOrdenes = async () => {
        const data = await OrdenesApi()
        setOrdenes(data)
    }
    fetchOrdenes()
},[])

  return (
    <>
    <Router>
        <div className='tema'>
          {ordenes !== undefined
            ?
              <Routes>
                <Route path="/" element={<Navigate to="/Ordenes" />} />
                <Route path='/Ordenes' element={<CargoOrders props={ordenes}/>}></Route>
                <Route path='/Detalles_de_Ordenes' element={<CargoDetails/>}></Route>
              </Routes>
            
            : <h1>Cargando...</h1>
          }
        </div>
      </Router>
    </>
  )
}

export default App
