import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar, TextField } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import {Box} from '@mui/material';
import { useState,useRef } from 'react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function FileChosePopup({setImgFIle,fileChosenOpen,setFileChosenOpen}) {
    const mtoken = localStorage.getItem('myChatToken');

   
        const fileInputRef = useRef(null);
        const [imageUrl, setImageUrl] = useState(null);
      
        const handleDivClick = () => {
          fileInputRef.current.click();
        };
      
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setImgFIle(file);
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImageUrl(reader.result);
              };
              reader.readAsDataURL(file);
            }
          };
   
   
  const handleClose=()=>
  {
    
    setFileChosenOpen(false);
  }

  const handleFileAdd=()=>
{


}

const handleChooseFileOpen=()=>
{

}

 
 

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={fileChosenOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Select Your Image
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <Box sx={{width:'400px',display:'flex',flexDirection:'column',gap:'20px'}}>
            <div>
      <div
        style={{
          height: "100px",
          border: "3px dashed rgb(59, 135, 122)",
          color: "rgb(59, 135, 122)",
          backgroundColor: "white",
          padding: "1vh",
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
        onClick={handleDivClick}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Selected"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
        ) : (
          'Choose your Image'
        )}
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
               
             
           
        

            </Box>
          
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleFileAdd}>
           Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
