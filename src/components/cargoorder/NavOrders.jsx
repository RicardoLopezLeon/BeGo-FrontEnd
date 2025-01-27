import { useState } from "react";
import { Tab, Tabs, styled } from "@mui/material";
import '../../stilos/generales.css'

function NavOrders(){

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return(
        <>
            <div className="container-header"> 
            <Tabs
                TabIndicatorProps={{
                    children: <span className="MuiTabs-indicatorSpan" />,
                }}
                sx={{
                    '& .MuiTabs-indicator': {
                    display: 'flex',
                    justifyContent: 'left',
                    backgroundColor: 'transparent',
                    },
                    '& .MuiTabs-indicatorSpan': {
                    maxWidth: '5dvw',
                    width: '100%',
                    backgroundColor: 'yellow',
                    },
                    width:'100dvw',
                    justifyContent: 'left'
                }}
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Upcoming" disableRipple sx={{
                        fontSize: 'clamp(1em,2.5vw,5em)',
                        color: 'white',
                        '&.Mui-selected': {
                            color: 'yellow',
                        },
                    }} />
                    <Tab label="Completed" disableRipple sx={{
                        fontSize: 'clamp(1em,2.5vw,5em)',
                        color: 'white',
                        '&.Mui-selected': {
                            color: 'yellow',
                        },
                    }} />
                    <Tab label="Past" sx={{
                        fontSize: 'clamp(1em,2.5vw,5em)',
                        color: 'white',
                        '&.Mui-selected': {
                            color: 'yellow',
                        },
                    }} />
                </Tabs>
            </div>
        </>
    )
}

export default NavOrders