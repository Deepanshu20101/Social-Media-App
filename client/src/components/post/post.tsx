import { Favorite, MoreVert, ThumbUp } from "@mui/icons-material";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";

const Post = () => {
  return (
    <Paper sx={{ width: "100%", borderRadius: 4, my: 1 }} elevation={3}>
      <Box sx={{ display: "flex", alignItems: "center", py: 1, px: 2 }}>
        <Avatar sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ mr: 2 }}>
          username
        </Typography>
        <Typography variant="body2">x mins ago</Typography>
        <IconButton sx={{ ml: "auto" }}>
          <MoreVert />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", py: 1, px: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          post description
        </Typography>
        <img
          src="/assets/1.png"
          alt="img"
          style={{ width: "100%", maxHeight: "500px", display: "contain" }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", py: 1, px: 2 }}>
        <IconButton
          size="small"
          sx={{ bgcolor: "#1273eb", color: "white", mr: 0.5 }}
        >
          <ThumbUp fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{ bgcolor: "#fb5252", color: "white", mr: 1 }}
        >
          <Favorite fontSize="small" />
        </IconButton>
        <Typography variant="body2">x people liked it</Typography>
        <Typography
          variant="body2"
          sx={{ ml: "auto", textDecoration: "underline dotted" }}
        >
          x comments
        </Typography>
      </Box>
    </Paper>
  );
};

export default Post;
