import { useCallback, useEffect, useState } from "react"
import '../../stilos/Ordenes.css'
import {DetallesApi} from '../../consumoapis/OrdenesApi'
import { Stepper, Step, StepLabel, Avatar, Collapse } from "@mui/material"
import Header from "../header"
import { styled } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import DetailPick from "./DetailPick"

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));

function CargoDetails(){

    const [detalles, setDetalles] = useState()
    const [statusStep, setStatusStep] = useState(0)
    const [expanded, setExpanded] = useState(false)
    const [colapso, setColapso] = useState(['','','','',''])
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

    const getTiempo = (num) => {
        const tiempo = new Date(detalles.destinations[num].startDate).toLocaleTimeString().split(':')
        const hrs = parseInt(tiempo[0],10)
        const min = tiempo[1]
        return hrs >= 12
            ? tiempo[0] == 12 
                ? `${hrs}:${min} PM` 
                : `${hrs-12}:${min} PM` 
            : `${hrs}:${min} AM`
    }

    const handleTrackOrder = () => {
        console.log("Track Order")
    }

    const handleChangePickup = () => {
        const tiempo = getTiempo(0)
        const date = new Date(detalles.destinations[0].startDate)
        setColapso([detalles.destinations[0].address,`${date.toLocaleDateString().split('/')[0]} de ${meses[date.getMonth()-1]} ${date.getFullYear()}`,tiempo,detalles.destinations[0].contact_info.email,detalles.destinations[0].contact_info.telephone])
    }

    const handleChangeDropoff = () => {
        const tiempo = getTiempo(1)
        const date = new Date(detalles.destinations[1].startDate)
        setColapso([detalles.destinations[1].address,`${date.toLocaleDateString().split('/')[0]} de ${meses[date.getMonth()-1]} ${date.getFullYear()}`,tiempo,detalles.destinations[1].contact_info.email,detalles.destinations[1].contact_info.telephone])
    }

    const checkStatus = useCallback(() => {
        let cont = 0
        detalles?.status_list?.pickup?.forEach(estado => {
            if(estado.active)
                cont +=1
        });
        setStatusStep(cont)
    },[detalles])

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    useEffect(() => {
        const fetchDetalles = async() => {
            const data = await DetallesApi()
            setDetalles(data)
        }
        fetchDetalles()
    },[])

    useEffect(() => {
        if (detalles) {
            checkStatus();
        }
    }, [detalles, checkStatus]);

    return(
        <>
            <Header title={'Cargo Details'}/>
            {detalles !== undefined
                ? <div className="container">
                    <div  style={{width:'90vw',border:'white', borderTop:'0.5px solid', borderBottom:'0.5px solid', marginBottom:'8vw'}}>
                        <div style={{width:'90%'}}>
                            <p style={{fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>Referencias {detalles.reference_number}</p>
                            <p style={{fontSize:'clamp(1.2em,2.5vw,5em)', margin:'0'}}>Order #{detalles.order_number}</p>
                        </div>
                        <Stepper activeStep={0} orientation="vertical" sx={{width:'90%'}}>
                            <Step onClick={handleChangePickup}>
                                <StepLabel icon={<LocalShippingTwoToneIcon sx={{color:'yellow', width:'5vw', height:'5vw'}}/>} >
                                    <p style={{color:'gray', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>PICKUP</p>
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <div style={{color:'white', width:'80%'}}>
                                            <p style={{fontSize:'clamp(1.3em,2.5vw,5em)',margin:'0'}}>{
                                                detalles.destinations[0].address.split(',')[3]+detalles.destinations[0].address.split(',')[4]
                                            }</p>
                                            <p style={{color:'gray', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{
                                                detalles.destinations[0].address.split(',')[0]+detalles.destinations[0].address.split(',')[1]+detalles.destinations[0].address.split(',')[2]
                                                
                                            }</p>
                                        </div>
                                        <div style={{display:'flex', flexDirection:'row', alignContent:'center', color:'gray', width:'80%'}}>
                                            <FiberManualRecordIcon sx={{paddingRight:'2vw', color:'blue', width:'5vw', height:'5vw'}} />
                                            <p style={{fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>
                                                Accepted
                                            </p>
                                        </div>
                                    </div> 
                                </StepLabel>
                            </Step>
                            <Step onClick={handleChangeDropoff}>
                                <StepLabel icon={<CircleOutlinedIcon sx={{opacity:'0.2', width:'5vw', height:'5vw'}}/>} >
                                    <p style={{color:'gray', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>DROPOFF</p>
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <div style={{color:'white', width:'80%'}}>
                                            <p style={{fontSize:'clamp(1.3em,2.5vw,5em)',margin:'0'}}>{
                                                detalles.destinations[1].address.split(',')[3]+detalles.destinations[1].address.split(',')[4]
                                            }</p>
                                            <p style={{color:'gray', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{
                                                 detalles.destinations[1].address.split(',')[0]+detalles.destinations[1].address.split(',')[1]+detalles.destinations[1].address.split(',')[3]
                                            }</p>
                                        </div>
                                        <div style={{display:'flex', flexDirection:'row', alignContent:'center', color:'gray', width:'80%'}}>
                                            <FiberManualRecordIcon sx={{paddingRight:'2vw', width:'5vw', height:'5vw'}} />
                                            <p style={{fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>
                                                On hold
                                            </p>
                                        </div>
                                    </div>
                                </StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    <div style={{ width:'90%', display:'flex',flexDirection:'column', justifyContent:'center',border:'0.5px solid white', borderRadius:'15px', marginBottom:'5vw'}}>
                        <div style={{marginTop:'3vw', width:'100%',display:'flex', justifyContent:'center'}}>
                            <Avatar alt="Conductor" src="https://randomuser.me/api/portraits/men/28.jpg" sx={{
                                width:'20vw', height:'20vw'
                             }}/>
                        </div>
                        <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
                            <p style={{fontSize:'clamp(1.2em, 2vw, 5em)'}}>{getTiempo(0)}</p>
                        </div>
                        <div style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                            <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
                                <Stepper activeStep={statusStep} orientation="vertical" sx={{width:'70%', display:'flex', justifyContent:'center'}}>
                                    {
                                        detalles.status_list.pickup.map((estado, key) => (
                                            <Step key={key}>
                                                <StepLabel icon={<DetailPick status={estado.active} />} >
                                                    <p style={{color:'white', fontSize:'clamp(0.8em,1.7vw,5em)',margin:'0'}}>{estado.status}</p>
                                                </StepLabel>
                                            </Step>
                                        ))
                                    }
                                </Stepper>
                            </div>
                            <button onClick={handleTrackOrder} className={statusStep >= 2 ? '' : 'boton-disebled'}
                            style={{borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px', marginTop:'3vw'}} disabled={statusStep < 2}>
                                <p style={{fontSize:'clamp(1.5em, 2.5vw, 5em)'}}>Track Order</p>
                            </button>
                        </div>       
                    </div>
                    <div style={{ width:'90%', display:'flex',flexDirection:'column',
                        justifyContent:'center', marginBottom:'3vw'}}>
                        <div style={{display:'flex', flexDirection:'row', border:'0.5px solid white', borderRadius:'15px'}}>
                        <p style={{color:'white', paddingLeft:'4vw', fontSize:'clamp(0.9em,2vw,5em)'}}>Pickup Data</p>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandLessIcon sx={{color:'yellow'}}/>
                        </ExpandMore>
                        </div>
                        <Collapse in={expanded} timeout='auto' unmountOnExit sx={{paddingLeft:'4vw'}}>
                            <div>
                                <p style={{fontSize:'clamp(0.8em, 2vw, 3.5em)'}}>{colapso[0]}</p>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', alignContent:'center'}}>
                                <p style={{fontSize:'clamp(0.8em, 2vw, 3.5em)'}}>{colapso[1]}</p>
                                <p style={{paddingLeft:'10vw', fontSize:'clamp(0.8em, 2vw, 3.5em)'}}>{colapso[2]}</p>
                            </div>
                            <div>
                                <p style={{fontSize:'clamp(0.8em, 2vw, 3.5em)'}}>{colapso[3]}</p>
                            </div>
                            <div>
                                <p style={{fontSize:'clamp(0.8em, 2vw, 3.5em)'}}>{colapso[4]}</p>
                            </div>
                        </Collapse>
                    </div>
                </div>
                : <h1>Cargando...</h1>
            }
        </>
    )
}

export default CargoDetails