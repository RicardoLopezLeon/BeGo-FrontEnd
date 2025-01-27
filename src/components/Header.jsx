import { useNavigate } from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import '../stilos/generales.css'

function Header({title}){

    const navigate = useNavigate()

    return (
        <div className="contaniner-header" style={{grid:'5', fontSize:'4vw'}}>
            <button onClick={() => navigate('/Ordenes')} style={{background:'black'}}><NavigateBeforeIcon sx={{color: 'white', width:'5vw', height:'5vw'}}/></button>
            <h2>{title}</h2>
            <button style={{background:'black'}}><NotificationsNoneOutlinedIcon sx={{color: 'yellow', width:'5vw', height:'5vw'}}/></button>
        </div>
    )
}

export default Header