import React, { useState } from 'react';
import { Avatar, Button, Divider } from '@mui/material';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import SendIcon from '@mui/icons-material/Send';
import './GroupOption.css';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function GroupOption({ myUserName, setMyUserName, conn, setConnection, activeChat, setActiveChat, messages, setMessages }) {
  const [groups, setGroups] = useState([{ name: 'Python Dev' }, { name: 'Call of Duty' }, { name: 'Cricket World' }]);
  const [userName, setUserName] = useState();
  const [chatRoom, setChatRoom] = useState();
  

  async function handleChatClick(group) {
    let x = Math.floor(Math.random() * 100) + 1;
    const newUserName = `${x}`;
    const newChatRoom = group.name;

    setMyUserName(newUserName);
    setUserName(newUserName);
    setChatRoom(newChatRoom);
    setActiveChat(group);

    try {

      const conn=new HubConnectionBuilder().withUrl("https://mychatmor.azurewebsites.net/chat").configureLogging(LogLevel.Information).build();

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
