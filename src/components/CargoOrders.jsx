import Header from './header';
import '../stilos/generales.css'
import NavOrders from './NavOrders';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import {OrdenesApi} from '../consumoapis/OrdenesApi'

function CargoOrders(){

    const [filtro, setFiltro] = useState("")
    const [ordenes, setOrdenes] = useState([{}])
    
    useEffect(() => {
        const fetchOrdenes = async () => {
            const data = await OrdenesApi()
            setOrdenes(data)
        }
        fetchOrdenes()
    },[])

    return(
        <>
            <div className='tema'>
                <Header title={'Cargo Orders'} />
                <NavOrders />
                <div style={{ display:'flex',flexDirection:'row', alignItems:'left', justifyContent:'left'}}>
                    <SearchIcon />
                    <input name='Search' value={filtro} onChange={e => setFiltro(e.target.value)}></input>
                    {filtro === ""
                    ? console.log(ordenes)
                    : ordenes.filter(({ordenes}) => ordenes.toLowerCase().includes(filtro.toLocaleLowerCase())).map(({id, orden}) => {
                        <p key={key}>{orden}</p>
                    })}
                </div>
            </div>
        </>
    )
}

export default CargoOrders