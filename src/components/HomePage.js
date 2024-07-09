import { Container, Typography } from "@mui/material";
import WaitingRoom from "./WaitingRoom";
import ChatRoom from "./ChatRoom";
import { useState } from "react";

const Homepage=()=>
{
    

   const [conn,setConnection]=useState();
    const [messages,setMessages]=useState([]);

    return <div>
        <Typography variant="h2" sx={{fontSize:'35px',marginBottom:'2%'}}>Welcome to the ChatApp</Typography>
        {!conn?
         <WaitingRoom messages={messages} setMessages={setMessages} setConnection={setConnection}/>:
         <ChatRoom conn={conn} messages={messages} setMessages={setMessages}/>
        }
       
    </div>



}

export default Homepage;