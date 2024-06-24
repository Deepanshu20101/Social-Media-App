import { Box } from "@mui/material";
import Post from "../post/post";
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  _id: string;
  userId: string;
  caption: string;
  img: string;
  likes: string[];
  comments: string[];
  createdAt: Date;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await axios.get(
          "http://localhost:5000/post/userFeed/666c1542c3faedd671afffbe"
        );
        setPosts(posts.data.userFeed);
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
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </Box>
  );
};

export default Posts;
