import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const WaitingRoom = ({messages,setMessages,setConnection}) => {
  const [userName, setUserName] = useState();
  const [chatRoom, setChatRoom] = useState();

  

 

 

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("dfsa",userName)
    try {

        const conn=new HubConnectionBuilder().withUrl("https://localhost:7071/chat").configureLogging(LogLevel.Information).build();

        conn.on("ListenRoomJoining",(username,msg)=>{  //listening for users joinging messages
            console.log("msg: ",msg);
            setMessages(messages=>[...messages,{username,msg}])
        })

        conn.on("ReceiveSpecificMessage",(username,msg)=>  //listening for chatting messages
        {
            console.log("fun");
            setMessages(messages=>[...messages,{username,msg}])

        })

        await conn.start();
        await conn.invoke("joinSpecificChatRoom",{userName,chatRoom});
        setConnection(conn);


    } catch (error) {
      console.log(error);
    }
  }

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChatRoom = (e) => {
    setChatRoom(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="UserName"
          onChange={handleUserName}
          value={userName}
          sx={{ marginTop: "2%" }}
        ></TextField>
        <br></br>
        <TextField
          label="ChatRoom"
          onChange={handleChatRoom}
          value={chatRoom}
          sx={{ marginTop: "2%" }}
        ></TextField>
        <br></br>
        <Button
          variant="contained"
          color="success"
          sx={{ marginTop: "2%" }}
          type="submit"
        >
          Join
        </Button>
      </form>
    </div>
  );
};

export default WaitingRoom;
