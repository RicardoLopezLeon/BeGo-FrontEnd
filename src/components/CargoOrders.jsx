import Header from './header';
import '../stilos/Ordenes.css'
import '../stilos/generales.css'
import NavOrders from './NavOrders';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import FichaOrden from './FichaOrden';

function CargoOrders({props}){

    const [filtro, setFiltro] = useState("")

    return(
        <>
            <div className='tema' style={{marginBottom:'6vw'}}>
                <Header title={'Cargo Orders'} />
                <NavOrders />
                <div style={{ display:'flex',flexDirection:'row', alignItems:'cneter', justifyContent:'center', marginTop:'3vw'}}>
                    <SearchIcon sx={{width:'3vh', height:'3vh'}}/>
                    <input style={{width:'75vw', color:'white', background:'#111111', fontSize:'clamp(1em,3vw,5em)'}} name='Search' value={filtro} onChange={e => setFiltro(e.target.value)}></input>
                </div>
                <div className='container'>
                    {filtro === "" 
                        ? props.map((orden,key) => (
                            <div key={key}>
                                <FichaOrden order={orden} />
                            </div>
                        ))
                        : props.filter(orden => orden.order_number.toLowerCase().includes(filtro.toLocaleLowerCase())).map((orden,key) => (
                            <div key={key}>
                                <FichaOrden order={orden} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CargoOrders