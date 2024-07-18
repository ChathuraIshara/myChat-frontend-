import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect } from 'react';

const MessageContainer = styled(Box)(({ isSender }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '0 0 10px 10px',
  paddingTop:'10px',
  justifyContent: isSender ? 'flex-end' : 'flex-start',
}));

const MessageBubble = styled(Box)(({ isSender }) => ({
  backgroundColor: isSender ? '#78aefa' : '#e5e5ea',
  color: isSender ? '#fff' : '#000',
  borderRadius: '20px',
  padding: '10px 15px',
  maxWidth: '70%',
  wordWrap: 'break-word',
  marginLeft: isSender ? '10px' : '0',
  marginRight: isSender ? '0' : '10px',
}));

const Message = ({ sender, message, isSender,myUserId }) => {
  useEffect(() => {
    console.log("myUserId",myUserId);
    console.log("sender id",sender.id);
    console.log("imgurl",sender.userimgurl);
    
  }, []);



  return (
    <MessageContainer isSender={isSender}>
      {!isSender && <Avatar alt={sender.name} src={sender.userimgurl} />}
      <MessageBubble isSender={isSender}>
        <Typography variant="body1">{message}</Typography>
      </MessageBubble>
    </MessageContainer>
  );
};

export default Message;
