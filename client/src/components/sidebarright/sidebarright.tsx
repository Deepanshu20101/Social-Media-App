import { MoreHoriz, Search } from "@mui/icons-material";
import { Badge } from "@mui/joy";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Key, useContext } from "react";
import { Context } from "../../context/contextprovider";
import RightContact from "./rightcontact";

const SideBarRight = () => {
  const { state } = useContext(Context);
  const { currentUser } = state;
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 340,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 340, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ display: "flex", p: 2, alignItems: "center" }}>
          <img
            src="/assets/giftbox.png"
            style={{ width: "40px", height: "40px" }}
          />
          <Typography variant="body1" sx={{ ml: 2 }}>
            <b>Usopp</b> and <b>2 other friends</b> have their birthdays today.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", px: 2, pt: 2 }}>
          <Typography variant="h6" sx={{ mr: "auto" }}>
            Contacts
          </Typography>
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </Box>
        <List>
          {currentUser.following.map((userId: string, idx: Key) => (
            <RightContact userId={userId} key={idx} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBarRight;
