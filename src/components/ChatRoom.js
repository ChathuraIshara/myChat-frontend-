import { Typography, Box } from "@mui/material";
import MessageCard from "./MessageCard";
import SendMessage from "./SendMessage";
import { useState } from "react";

const ChatRoom = ({conn, messages,setMessages }) => {

    const [tarChatRoom,setTarChatRoom]=useState(conn.userName);


  return (
    <div>
      <Typography variant="h3" sx={{marginBottom:'5%'}}>ChatRoom</Typography>
      <SendMessage conn={conn}></SendMessage>

      <Box>
        {messages.map((item,index) => (
          <div key={index}>
            <MessageCard
              item={item}
            />
          </div>
        ))}
      </Box>
    </div>
  );
};

export default ChatRoom;
