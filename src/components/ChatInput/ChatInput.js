import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

const ChatInputContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '30px',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  position: 'relative',
 
});

const StyledTextField = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
    paddingRight: '50px',
    border: '1px solid #CFD2DA', // Remove the border
    paddingLeft:'20px'
  },
  '& .MuiOutlinedInput-input': {
    color: 'gray',
    fontSize: '19px',
    fontWeight: '500',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none', // Hide the notched outline
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    display: 'none', // Keep it hidden on hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    display: 'none', // Keep it hidden on focus
  },
});

const SendButton = styled(IconButton)({
  position: 'absolute',
  right: '10px',
  color: '#78aefa',
  '&:hover': {
    backgroundColor: 'transparent', // No background color change on hover
  },
});

function ChatInput({conn,setConnection}) {
  const [message, setMessage] = React.useState('');

 async function handleSend () {
    // Handle message send logic
    console.log('Message sent:', message);
    try{
      await conn.invoke("sendMessage",message);
      setMessage("");
      
  }catch(error)
  {
      console.log(error);
  }
    setMessage('');
  };

  return (
    <ChatInputContainer>
      <StyledTextField
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
      />
      <SendButton onClick={handleSend}>
        <SendIcon />
      </SendButton>
    </ChatInputContainer>
  );
}

export default ChatInput;
