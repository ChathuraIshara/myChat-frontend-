
import SideBar from '../SideBar/SideBar'
import OptionBar from '../OptionBar/OptionBar';
import ChatBar from '../ChatBar/ChatBar';
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";


function MyChatApp() {
  const [type, setType] = useState("groups");
  const [activeChat,setActiveChat]=useState(null);
  const [messages,setMessages]=useState([]);
  const [conn,setConnection]=useState();
  const [myUserName,setMyUserName]=useState('');

  useEffect(() => {
    const mtoken = localStorage.getItem('myChatToken');
    console.log("toek",mtoken);
    const name =jwtDecode(mtoken).Name;
    const id =jwtDecode(mtoken).Id;
    setMyUserName(name);

  
  
  }, []);


  return (
    <div className="App">
     
      <div className="mainApp">
      <SideBar myUserName={myUserName} setActiveChat={setActiveChat} type={type} setType={setType}></SideBar>
      <OptionBar myUserName={myUserName} setMyUserName={setMyUserName} conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages} activeChat={activeChat} setActiveChat={setActiveChat} type={type} setType={setType}></OptionBar>
      <ChatBar myUserName={myUserName} setMyUserName={setMyUserName}  conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages}  activeChat={activeChat} setActiveChat={setActiveChat}></ChatBar>
      </div> 
      
    </div>
  );
}

export default MyChatApp;
