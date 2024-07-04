import { Box, Divider, Grid, List, TextField, Toolbar } from "@mui/material";
import TopBar from "../topbar/topbar";
import ChatsLeft from "./chatsLeft/chatsLeft";
import ChatsRight from "./chatsRight/chatsRight";
import { useContext } from "react";
import { Context } from "../../context/contextprovider";

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
          <Grid item lg={3}>
            <TextField
              label="Search for friends..."
              sx={{ width: "100%", "& fieldset": { border: "none" }, mt: 1.3 }}
            />
            <Divider variant="middle" />
            <List>
              {currentUser.following.map((userId: string) => (
                <ChatsLeft userId={userId} />
              ))}
            </List>
          </Grid>
          <Grid item lg={5}>
            item
          </Grid>
          <Grid item lg={4}>
            <ChatsRight />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Chat;
