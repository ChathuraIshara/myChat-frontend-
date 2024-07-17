import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Avatar, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Box } from "@mui/material";
import { useState } from "react";
import FileChosePopup from "../FileChosePopup/FileChosePopup";
import axios from "axios";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SettingsPopup({
  myImgUrl,
  myUserName,
  setMyImgUrl,
  setMyUserName,
  settingsOpen,
  setSettingsOpen,
}) {
  const mtoken = localStorage.getItem("myChatToken");

  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [fileChosenOpen, setFileChosenOpen] = useState(false);

  const [name, setName] = useState(myUserName);
  const [email, setEmail] = useState(jwtDecode(mtoken).Email);

  const handleClose = () => {
    setIsEditDisabled(true);
    setSettingsOpen(false);
  };

  async function handleRealUpdate() {
    const mtoken = localStorage.getItem("myChatToken");
    const id = jwtDecode(mtoken).Id;
    try{
        var response = await axios.put("https://mychatmor.azurewebsites.net/api/User/user/"+`${id}`, {
            id: id,
            name: name,
            email: email,
          });
          if(response.status==200)
          {
            console.log("user updated succesfully");
            setMyUserName(name);
            setSettingsOpen(false);

          }

    }catch(err)
    {
        console.log(err);
    }
   
  }

  const handleNewName = (e) => {
    setName(e.target.value);
  };

  const handleNewEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChooseFileOpen = () => {
    setFileChosenOpen(true);
  };

  const handleEditDisabled = () => {
    setIsEditDisabled(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={settingsOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Settings
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              width: "500px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                onClick={isEditDisabled ? null : handleChooseFileOpen}
                src={myImgUrl}
                sx={{
                  width: 78,
                  height: 78,
                  display: "flex",
                  justifyContent: "center",
                }}
              ></Avatar>
            </Box>
            <TextField
              onChange={handleNewName}
              disabled={isEditDisabled}
              value={name}
              label="Fullname"
            ></TextField>
            <TextField
              onChange={handleNewEmail}
              disabled={isEditDisabled}
              value={email}
              label="Email"
            ></TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={isEditDisabled ? handleEditDisabled : handleRealUpdate}
          >
            {isEditDisabled ? "Edit Details" : "Save Changes"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <FileChosePopup
        fileChosenOpen={fileChosenOpen}
        setFileChosenOpen={setFileChosenOpen}
      ></FileChosePopup>
    </React.Fragment>
  );
}
