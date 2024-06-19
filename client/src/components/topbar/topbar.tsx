import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Chat, Search, Person, Notifications } from "@mui/icons-material";

const TopBar = () => {
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
          <IconButton size="large" sx={{ p: 0 }}>
            <Avatar />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
