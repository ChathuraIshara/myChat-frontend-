import logo from './logo.svg';
import './App.css';
import Homepage from './components/HomePage';
import SideBar from './components/SideBar/SideBar';
import OptionBar from './components/OptionBar/OptionBar';
import ChatBar from './components/ChatBar/ChatBar';
import { useState } from 'react';

function App() {
  const [type, setType] = useState("groups");
  const [activeChat,setActiveChat]=useState(null);
  const [messages,setMessages]=useState([]);
  const [conn,setConnection]=useState();
  const [myUserName,setMyUserName]=useState('');
  return (
    <div className="App">
      {/* <Homepage/> */}
      <div className="mainApp">
      <SideBar setActiveChat={setActiveChat} type={type} setType={setType}></SideBar>
      <OptionBar myUserName={myUserName} setMyUserName={setMyUserName} conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages} activeChat={activeChat} setActiveChat={setActiveChat} type={type} setType={setType}></OptionBar>
      <ChatBar myUserName={myUserName} setMyUserName={setMyUserName}  conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages}  activeChat={activeChat} setActiveChat={setActiveChat}></ChatBar>
      </div>
      
    </div>
  );
}

export default App;
