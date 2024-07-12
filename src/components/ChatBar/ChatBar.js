import React from 'react'
import './ChatBar.css'
import myChat from '../../images/myChat2.png'
import Chat from '../Chat/Chat'

function ChatBar({myUserName,setMyUserName,conn,setConnection,activeChat,setActiveChat,messages,setMessages}) {
  return (
    <div className='chatbar'>  
    {activeChat==null?<div className='nochat'></div>:<Chat myUserName={myUserName} setMyUserName={setMyUserName}  conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages} activeChat={activeChat}></Chat>}
    </div>
  )
}

export default ChatBar