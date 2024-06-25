import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Chat, Search, Person, Notifications } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Context } from "../../context/contextprovider";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const { state, dispatch } = useContext(Context);
  const { currentUser } = state;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleUserLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileNav = () => {
    navigate(`/profile/${currentUser._id}`);
  };

  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          component="a"
          noWrap
          variant="h4"
          sx={{
            ml: 10,
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: ".3rem",
            flexGrow: 1,
          }}
          href="/"
        >
          Social
        </Typography>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <TextField
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: <Search />,
            }}
            sx={{
              bgcolor: "white",
              borderRadius: 6,
              "& fieldset": { border: "none" },
              width: "32rem",
            }}
          />
        </Box>
        <Box sx={{ mr: 4 }}>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={1} color="error">
              <Person />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={2} color="error">
              <Chat />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={1} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </Box>
        <Box>
          <IconButton size="large" sx={{ p: 0 }} onClick={handleOpenUserMenu}>
            <Tooltip title="Open menu">
              <Avatar />
            </Tooltip>
          </IconButton>
          <Menu
            id="appbar-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            sx={{ mt: "42px" }}
            disableScrollLock
          >
            <MenuItem onClick={handleProfileNav}>Profile</MenuItem>
            <MenuItem onClick={handleUserLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
