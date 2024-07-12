import React from 'react'
import './OptionBar.css'
import Divider from '@mui/material/Divider';
import GroupOption from '../GroupOption/GroupOption';


function OptionBar({myUserName,setMyUserName,conn,setMyUserNameconn,setConnection,type,setType,activeChat,setActiveChat,messages,setMessages}) {
  return (
    <div className='optionbar'>
      {type=='groups'? <GroupOption myUserName={myUserName} setMyUserName={setMyUserName}  conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages} activeChat={activeChat} setActiveChat={setActiveChat} ></GroupOption>:<div>No</div>}
    </div>
  )
}

export default OptionBar