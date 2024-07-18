
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
  const [myImgUrl,setMyImgUrl]=useState('');

  const [userUpdateCount,setUserUpdateCount]=useState(0);

  useEffect(() => {
    const mtoken = localStorage.getItem('myChatToken');
    console.log("toek",mtoken);
    const name =jwtDecode(mtoken).Name;
    const id =jwtDecode(mtoken).Id;
    setMyUserName(name);
    setMyImgUrl(jwtDecode(mtoken).imgurl);

  
  
  }, [userUpdateCount]);


  return (
    <div className="App">
     
      <div className="mainApp">
      <SideBar setUserUpdateCount={setUserUpdateCount} myImgUrl={myImgUrl} setMyImgUrl={setMyImgUrl} setMyUserName={setMyUserName} myUserName={myUserName} setActiveChat={setActiveChat} type={type} setType={setType}></SideBar>
      <OptionBar myUserName={myUserName} setMyUserName={setMyUserName} conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages} activeChat={activeChat} setActiveChat={setActiveChat} type={type} setType={setType}></OptionBar>
      <ChatBar myUserId={id} myUserName={myUserName} setMyUserName={setMyUserName}  conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages}  activeChat={activeChat} setActiveChat={setActiveChat}></ChatBar>
      </div> 
      
    </div>
  );
}

export default MyChatApp;
