import { Avatar, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../../context/contextprovider";
import { format } from "timeago.js";

interface messagesProp {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
}

const Message: React.FC<{ message: messagesProp }> = ({ message }) => {
  const { state } = useContext(Context);
  const { currentUser } = state;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:
          currentUser._id === message.sender ? "flex-end" : "flex-start",
      }}
    >
      <Avatar />
      <Box>
        <Box sx={{ bgcolor: "lightblue", borderRadius: 4, p: 1 }}>
          <Typography>{message.text}</Typography>
        </Box>
        <Typography variant="caption">{format(message.createdAt)}</Typography>
      </Box>
    </Box>
  );
};

export default Message;
