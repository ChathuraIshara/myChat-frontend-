import { Typography, Box } from "@mui/material";

const MessageCard = ({ item }) => {
  return (
    <div>
      <Box>
        <Typography >
          {item.msg} -{" "}
          <Box component="span" sx={{ color: "#6199f2" }}>
            {item.username}
          </Box>
        </Typography>
      </Box>
    </div>
  );
};

export default MessageCard;
