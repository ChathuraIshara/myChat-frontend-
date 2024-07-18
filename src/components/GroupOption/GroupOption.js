import React, { useState } from 'react';
import { Avatar, Button, Divider } from '@mui/material';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import SendIcon from '@mui/icons-material/Send';
import './GroupOption.css';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { jwtDecode } from 'jwt-decode';


function GroupOption({ myUserName, setMyUserName, conn, setConnection, activeChat, setActiveChat, messages, setMessages }) {
  const [groups, setGroups] = useState([{ name: 'Python Dev' }, { name: 'Call of Duty' }, { name: 'Cricket World' }]);
  const [userName, setUserName] = useState();
  const [chatRoom, setChatRoom] = useState();

  const mtoken = localStorage.getItem('myChatToken');

  const userId=jwtDecode(mtoken).Id;
  
  async function handleChatClick(group) {
    const newChatRoom = group.name;
    setChatRoom(newChatRoom);
    setActiveChat(group);

    try {
      const conn = new HubConnectionBuilder()
        .withUrl("https://mychatmor.azurewebsites.net/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("ListenRoomJoining", (userId, msg) => {
        console.log("msg: ", msg);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: { name: userId, avatar: 'path/to/avatar.jpg' }, // Adjust avatar path as needed
            message: msg,
          },
        ]);
      });

      conn.on("ReceiveSpecificMessage", (userId, msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: { name: userId, avatar: 'path/to/avatar.jpg' }, // Adjust avatar path as needed
            message: msg,
          },
        ]);
        console.log("receive username", userId);
      });

      await conn.start();
      setConnection(conn);
      await conn.invoke("joinSpecificChatRoom", { userId: userId, chatRoom: newChatRoom });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='groupoption'>
      <h3 className='groupstitle'>Your Groups</h3>
      <div className='groups'>
        <ul>
          {groups.map((group, index) => (
            <li key={index} className={activeChat && activeChat.name === group.name ? 'activeChatGroup' : ''}>
              <div className='group'>
                <div className='groupinfo'>
                  <Avatar></Avatar>
                  <h3>{group.name}</h3>
                  <Button
                    onClick={() => handleChatClick(group)}
                    sx={{
                      borderRadius: '25px',
                      backgroundColor: '#78aefa',
                      '&:hover': {
                        backgroundColor: '#78aefa' // Keeps the background color same on hover
                      },
                    }}
                    size='small'
                    variant="contained"
                    endIcon={<AddCircleIcon />}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default GroupOption;