import { Favorite, MoreVert, ThumbUp } from "@mui/icons-material";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

interface PostProp {
  _id: string;
  userId: string;
  caption: string;
  img: string;
  likes: string[];
  comments: string[];
  createdAt: Date;
}

interface UserProp {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  coverPic: string;
  followers: string[];
  following: string[];
  city: string;
  relationship: "Single" | "Married";
}

const Post: React.FC<{ post: PostProp }> = ({ post }) => {
  const [user, setUser] = useState<UserProp | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(
          `http://localhost:5000/user/${post.userId}`
        );
        setUser(user.data.user);
      } catch (error) {
        alert(`${error}`);
      }
    };
    getUser();
  }, [post.userId]);

  const handleAvatarRoute = () => {
    navigate("/profile/:id");
  };

  return (
    <Paper sx={{ width: "100%", borderRadius: 4, my: 1 }} elevation={3}>
      <Box sx={{ display: "flex", alignItems: "center", py: 1, px: 2 }}>
        <IconButton onClick={handleAvatarRoute} sx={{ p: 0, mr: 1 }}>
          <Avatar src={user?.profilePic} />
        </IconButton>
        <Typography variant="h6" sx={{ mr: 2 }}>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="body2">{format(post.createdAt)}</Typography>
        <IconButton sx={{ ml: "auto" }}>
          <MoreVert />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", py: 1, px: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.caption}
        </Typography>
        <img
          src={post.img}
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
        <Typography variant="body2">{post.likes.length} likes</Typography>
        <Typography
          variant="body2"
          sx={{ ml: "auto", textDecoration: "underline dotted" }}
        >
          {post.comments.length} comments
        </Typography>
      </Box>
    </Paper>
  );
};

export default Post;
