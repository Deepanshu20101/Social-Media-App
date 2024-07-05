import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  TextField,
  Toolbar,
} from "@mui/material";
import TopBar from "../topbar/topbar";
import ChatsLeft from "./chatsLeft/chatsLeft";
import ChatsRight from "./chatsRight/chatsRight";
import { Key, useContext } from "react";
import { Context } from "../../context/contextprovider";
import Message from "./message/message";
import { Send } from "@mui/icons-material";

const Chat = () => {
  const { state } = useContext(Context);
  const { currentUser } = state;
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
              {currentUser.following.map((userId: string) => (
                <ChatsLeft userId={userId} key={userId} />
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
            <Box sx={{ flexGrow: 1, mt: 2, overflowY: "auto" }}>
              <Message />
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
                sx={{ flexGrow: 1, mr: 2 }}
              />
              <Button
                variant="contained"
                endIcon={<Send />}
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
