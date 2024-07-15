import logo from './logo.svg';
import './App.css';
import Homepage from './components/HomePage';
import SideBar from './components/SideBar/SideBar';
import OptionBar from './components/OptionBar/OptionBar';
import ChatBar from './components/ChatBar/ChatBar';
import { useState } from 'react';
import SignupPage from './components/SignUp/SignUpPage';
import LoginPage from './components/LoginPage/LoginPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyChatApp from './components/MyChatApp/MyChatApp';

function App() {
  const [type, setType] = useState("groups");
  const [activeChat,setActiveChat]=useState(null);
  const [messages,setMessages]=useState([]);
  const [conn,setConnection]=useState();
  const [myUserName,setMyUserName]=useState('');
  return (
    <div className="App">
      {/* <Homepage/> */}
      {/* <div className="mainApp">
      <SideBar setActiveChat={setActiveChat} type={type} setType={setType}></SideBar>
      <OptionBar myUserName={myUserName} setMyUserName={setMyUserName} conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages} activeChat={activeChat} setActiveChat={setActiveChat} type={type} setType={setType}></OptionBar>
      <ChatBar myUserName={myUserName} setMyUserName={setMyUserName}  conn={conn} setConnection={setConnection} messages={messages} setMessages={setMessages}  activeChat={activeChat} setActiveChat={setActiveChat}></ChatBar>
      </div> */}
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginPage></LoginPage>}></Route>
      <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
      <Route path='/mychatapp' element={<MyChatApp></MyChatApp>}></Route>
      </Routes>
      </BrowserRouter>
    
      
    </div>
  );
}

export default App;
