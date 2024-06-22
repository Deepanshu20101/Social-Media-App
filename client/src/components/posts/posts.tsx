import { Box } from "@mui/material";
import Post from "../post/post";
import { useEffect } from "react";
import axios from "axios";

const Posts = () => {
  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await axios.get(
          "http://localhost:5000/post/userFeed/666c15b5c3faedd671afffc2"
        );
      } catch (error) {
        alert(`Error ${error}`);
      }
    };
    getPosts();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 2,
        width: "100%",
      }}
    >
      <Post />
    </Box>
  );
};

export default Posts;
