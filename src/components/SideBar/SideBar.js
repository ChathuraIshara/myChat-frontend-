import React from "react";
import "./SideBar.css";
import { Box, Stack, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import avimg from "../../images/chathura.jpg";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import GroupsIcon from "@mui/icons-material/Groups";
import ContactsIcon from "@mui/icons-material/Contacts";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import menuicon from '../../images/menu-icon.png'
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import SettingsPopup from "../SettingsPopup/SettingsPopup";

function SideBar({myImgUrl,setMyImgurl,setMyUserName,myUserName,type,setType,setActiveChat,setUserUpdateCount}) {

  
  

  const [isMobileMenu,setIsMobileMenu]=useState(true);
  const [settingsOpen,setSettingsOpen]=useState(false);

  const handleToggle=()=>
    {
      isMobileMenu?setIsMobileMenu(false):setIsMobileMenu(true);
  
    }


  const handleTimeline = () => {
    setType("timeline");
    setActiveChat(null);
  };
  const handleGroups = () => {
    setType("groups");
  };
  const handleContacts = () => {
    setType("contacts");
    setActiveChat(null);
  };
  const handleDeleted = () => {
    setType("deleted");
    setActiveChat(null);
  };
  const handleSettings = () => {
    setSettingsOpen(true);
    setType("settings");
    setActiveChat(null);
    
  };
  return (
    <div className="sidebar">
      <Box sx={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <Avatar alt="Remy Sharp" src={myImgUrl} />
        <h3 className="username">{myUserName}</h3>
      
      </Box>
      <Box sx={{ margin: "0px" }}>
        <ul>
          <li
            className={type == "timeline" ? "selectedType" : ""}
            onClick={handleTimeline}
          >
            <div className="card">
              <AccessTimeFilledIcon
                sx={{ marginRight: "20px" }}
              ></AccessTimeFilledIcon>
              TimeLine
            </div>
          </li>
          <li
            className={type == "groups" ? "selectedType" : ""}
            onClick={handleGroups}
          >
            <div className="card">
              <GroupsIcon sx={{ marginRight: "20px" }}></GroupsIcon>Groups
            </div>
          </li>
          <li
            className={type == "contacts" ? "selectedType" : ""}
            onClick={handleContacts}
          >
            <div className="card">
              <ContactsIcon sx={{ marginRight: "20px" }}></ContactsIcon>Contacts
            </div>
          </li>
          <li
            className={type == "deleted" ? "selectedType" : ""}
            onClick={handleDeleted}
          >
            <div className="card">
              <RestoreFromTrashIcon
                sx={{ marginRight: "20px" }}
              ></RestoreFromTrashIcon>
              Deleted
            </div>
          </li>
          <li
            className={type == "settings" ? "selectedType" : ""}
            onClick={handleSettings}
          >
            <div className="card">
              <SettingsIcon sx={{ marginRight: "20px" }}></SettingsIcon>Settings
            </div>
          </li>
        </ul>
      </Box>
      <SettingsPopup setUserUpdateCount={setUserUpdateCount} myImgUrl={myImgUrl} myUserName={myUserName} setMyImgurl={setMyImgurl} setMyUserName={setMyUserName}  settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen}></SettingsPopup>
    </div>
  );
}

export default SideBar;
