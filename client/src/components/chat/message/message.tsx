import { Avatar, Box, Typography } from "@mui/material";

const Message = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar />
      <Box>
        <Box sx={{ bgcolor: "lightblue", borderRadius: 4, p: 1 }}>
          <Typography>Hello there</Typography>
        </Box>
        <Typography variant="caption">1 hour ago</Typography>
      </Box>
    </Box>
  );
};

export default Message;
