import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';

function DetailPick(status){
    return (status.status ? <CheckCircleIcon sx={{color:'yellow', width:'5vw', height:'5vw'}} /> : <FiberManualRecordTwoToneIcon sx={{color:'yellow', width:'5vw', height:'5vw'}}/>)
}

export default DetailPick