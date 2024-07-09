import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";


const SendMessage=({conn})=>
    {

        const [messag,setMessag]=useState();

        const handleMessag = (e) => {
            setMessag(e.target.value);
          };

        async function handleSubmit(e)
        {
            e.preventDefault();
            try{
                await conn.invoke("sendMessage",messag);
                setMessag("");
                
            }catch(error)
            {
                console.log(error);
            }

        }



        return <div>
             <form onSubmit={handleSubmit}>
        <Stack sx={{marginBottom:'2%'}} alignItems="center" >
        <TextField
          label="Enter your message"
          onChange={handleMessag}
          value={messag}
          sx={{ marginTop: "2%" }}
        ></TextField>
        <Button
          variant="contained"
          color="success"
          sx={{ marginTop: "2%" }}
          type="submit"
        >
          Send
        </Button>

        </Stack>
        
      </form>
        </div>

    }

export default SendMessage;