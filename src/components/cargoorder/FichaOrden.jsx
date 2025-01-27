import { useNavigate } from "react-router-dom";
import { Box, CardActions, Paper, Step, StepLabel, Stepper } from "@mui/material"
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


function FichaOrden({order}){

    const navigate = useNavigate()

    const getFecha = (epoch) => {
        const fecha = new Date(epoch)
        return fecha.toLocaleDateString()
    }

    const getTiempo = (epoch) => {
        const tiempo = new Date(epoch)
        return tiempo.toLocaleTimeString()
    }

    const getDifencia = (epoch1, epoch2) =>{
        const tiempo = new Date(epoch2-epoch1)
        return tiempo.toLocaleTimeString()
    } 

    const handleClickStart = () => {
        console.log('Navegar')
    }

    return(
        <>
            <p style={{marginTop:'clamp(2em,5vw,7em)'}}><span style={{color:'gray'}}>Order </span>#{order.order_number}</p>
            {order != []
            ?<Paper variant="elevation" sx={{width:'82vw', display:'flex', flexDirection:'column', alignItems: 'center',
                borderRadius:5, color:'white', background:'#111111'
                }}>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Box sx={{width:'82vw', borderTopLeftRadius:'15px', borderTopRightRadius:'15px', border:'0.5px solid white'}}>
                        {order.status_string === "Orden Asignada"
                            ? <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <Inventory2OutlinedIcon sx={{paddingLeft:'2vw', width:'5vw', height:'5vw'}} />
                                    <p style={{paddingLeft:'2vw', fontSize:'clamp(1em,3vw,5em)'}}>FCL</p>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <FiberManualRecordIcon sx={{paddingRight:'2vw', color:'blue', width:'5vw', height:'5vw'}} />
                                    <p style={{paddingRight:'5vw', fontSize:'clamp(1em,3vw,5em)'}}>{order.status_string}</p>
                                </div>
                              </div>
                            : <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <AirportShuttleOutlinedIcon sx={{paddingLeft:'2vw', width:'5vw', height:'5vw'}} />
                                    <p style={{paddingLeft:'2vw', fontSize:'clamp(1em,3vw,5em)'}}>FTL</p>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <p style={{paddingRight:'5vw', fontSize:'clamp(1em,3vw,5em)'}}>{order.status_string}</p>
                                </div>
                              </div>
                        }
                    </Box>
                    <Box sx={{width:'82vw',borderLeft:'0.5px solid' , borderRight:'0.5px solid'}}>
                        <Stepper activeStep={0} orientation="vertical">
                            <Step>
                                <StepLabel icon={<LocalShippingTwoToneIcon sx={{width:'4vh', height:'4vh'}}/>} >
                                    <p style={{color:'gray', fontSize:'clamp(0.6em,1.5vw,5em)',margin:'0'}}>PICKUP</p>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        <div style={{color:'white', width:'70%'}}>
                                            <p style={{fontSize:'clamp(1.3em,2.5vw,5em)',margin:'0'}}>{
                                                order.destinations[0].address.split(',')[3]+order.destinations[0].address.split(',')[4]
                                            }</p>
                                            <p style={{color:'gray', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{
                                                order.destinations[0].address.split(',')[0]+order.destinations[0].address.split(',')[1]+order.destinations[0].address.split(',')[2]
                                                
                                            }</p>
                                        </div>
                                        <div style={{color:'gray',width:'30%'}}>
                                            <p style={{fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{
                                                getFecha(order.destinations[0].start_date)
                                            }</p>
                                            <p style={{color:'white', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{
                                                getTiempo(order.destinations[0].start_date)
                                            }</p>
                                        </div>
                                    </div>
                                    
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel icon={<LocationOnOutlinedIcon sx={{width:'4vh', height:'4vh'}}/>} >
                                    <p style={{color:'gray', fontSize:'clamp(0.6em,1.5vw,5em)',margin:'0'}}>DROPOFF</p>
                                        <div style={{display:'flex', flexDirection:'row'}}>
                                            <div style={{color:'white', width:'70%'}}>
                                                <p style={{fontSize:'clamp(1.3em,2.5vw,5em)',margin:'0'}}>{
                                                    order.destinations[1].address.split(',')[3]+order.destinations[1].address.split(',')[4]
                                                }</p>
                                                <p style={{color:'gray', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{
                                                    order.destinations[1].address.split(',')[0]+order.destinations[1].address.split(',')[1]+order.destinations[1].address.split(',')[3]
                                                }</p>
                                            </div>
                                            <div style={{color:'gray', width:'30%'}}>
                                                <p style={{fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{
                                                    getFecha(order.destinations[1].start_date)
                                                }</p>
                                                <p style={{color:'white', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{
                                                    getTiempo(order.destinations[1].start_date)
                                                }</p>
                                            </div>
                                        </div>
                                </StepLabel>
                            </Step>
                        </Stepper>
                    </Box>
                </Box>
                <CardActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100.5%' ,p:'0'}}>
                    {order.status_string === "Orden Asignada"
                        ? <button onClick={handleClickStart} className="boton" style={{
                                width: '50vw', borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 15
                            }}>
                            <p style={{
                                fontWeight:'bold',
                                alignItems: 'center',
                                fontSize:'clamp(0.8em,1.7vw,5em)'
                             }}>
                                Start pickup in <span style={{fontSize:'clamp(0.5vw,2.5vw,5em)', fontWeight:'bold'}}>{getDifencia(order.destinations[1].start_date,order.destinations[0].start_date)}</span>
                            </p>
                          </button>
                        : <div></div>}
                    <button className="boton" onClick={() => navigate('/Detalles_de_Ordenes')} style={{
                            width: '25vw', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 15
                        }}>
                            <p style={{
                                paddingRight: '2vw',
                                fontWeight:'bold',
                                fontSize:'clamp(0.8em,1.7vw,5em)'
                            }}>Resume</p>
                            <VisibilityOutlinedIcon sx={{paddingRight:'1vw', width:'4.5vw', height:'4.5vw'}}/>
                    </button>
                </CardActions>
            </Paper>
            : <></>}
        </>
    )
}

export default FichaOrden