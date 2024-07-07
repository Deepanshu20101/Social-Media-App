import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TopBar from "../topbar/topbar";
import ChatsLeft from "./chatsLeft/chatsLeft";
import ChatsRight from "./chatsRight/chatsRight";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/contextprovider";
import Message from "./message/message";
import { Send } from "@mui/icons-material";
import axios from "axios";
import { io, Socket } from "socket.io-client";

interface conversationsProp {
  _id: string;
  members: [];
}

interface messagesProp {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
}

const Chat = () => {
  const { state } = useContext(Context);
  const { currentUser } = state;

  const [conversations, setConversations] = useState<conversationsProp[]>([]);
  const [currentChat, setCurrentChat] = useState<conversationsProp>();
  const [messages, setMessages] = useState<messagesProp[]>([]);
  const [newMessage, setNewMessage] = useState<string>();
  const [socket, setSocket] = useState<Socket>();

  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const conversations = await axios.get(
          `http://localhost:5000/chat/conversation/${currentUser._id}`
        );
        setConversations(conversations.data.conversation);
      } catch (error) {
        alert(`${error}`);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messages = await axios.get(
          `http://localhost:5000/chat/message/${currentChat?._id}`
        );
        setMessages(messages.data.message);
      } catch (error) {
        alert(`${error}`);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setSocket(io("ws://localhost:8000"));
  }, []);

  const handleSend = async () => {
    try {
      const res = await axios.post("http://localhost:5000/chat/message/", {
        conversationId: currentChat?._id,
        sender: currentUser._id,
        text: newMessage,
      });
      setMessages([...messages, res.data.messageData]);
      setNewMessage("");
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Grid container sx={{ width: "100%", height: "calc(100vh - 64px)" }}>
          <Grid bgcolor="#DBE2EF" item lg={3} sx={{ pt: 1.3 }}>
            <TextField
              label="Search for friends..."
              sx={{ width: "100%", "& fieldset": { border: "none" } }}
            />
            <Divider variant="middle" />
            <List>
              {conversations?.map((c, idx) => (
                <ChatsLeft
                  conversation={c}
                  setCurrentChat={setCurrentChat}
                  key={idx}
                />
              ))}
            </List>
          </Grid>
          <Grid
            item
            lg={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              px: 2,
            }}
          >
            {currentChat ? (
              <>
                <Box sx={{ flexGrow: 1, mt: 2, overflowY: "auto" }}>
                  {messages?.map((message, idx) => (
                    <Message message={message} key={idx} />
                  ))}
                  <div ref={scrollEndRef} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    my: 2,
                    p: 2,
                    bgcolor: "#EEEEEE",
                    borderRadius: 3,
                  }}
                >
                  <TextField
                    label="Send a message..."
                    multiline
                    variant="standard"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    sx={{ flexGrow: 1, mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<Send />}
                    onClick={handleSend}
                    sx={{
                      textTransform: "capitalize",
                      bgcolor: "#00ADB5",
                      "&:hover": {
                        bgcolor: "#393E46",
                      },
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </>
            ) : (
              <Typography>Start chat</Typography>
            )}
          </Grid>
          <Grid bgcolor="#DBE2EF" item lg={4} sx={{ pt: 1.3 }}>
            {currentUser.following.map((userId: string) => (
              <ChatsRight userId={userId} key={userId} />
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Chat;
