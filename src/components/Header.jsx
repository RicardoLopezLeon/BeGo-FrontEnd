import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import '../stilos/generales.css'

function Header({title}){



    return (
        <div className="contaniner-header" style={{grid:'5', fontSize:'4vw'}}>
            <button style={{background:'black'}}><NavigateBeforeIcon  fontSize='large' sx={{color: 'white'}}/></button>
            <h2>{title}</h2>
            <button style={{background:'black'}}><NotificationsNoneOutlinedIcon fontSize='large' sx={{color: 'yellow'}}/></button>
        </div>
    )
}

export default Header