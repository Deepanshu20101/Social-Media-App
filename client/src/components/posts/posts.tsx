import { Box } from "@mui/material";
import Post from "../post/post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/contextprovider";

interface Post {
  _id: string;
  userId: string;
  caption: string;
  img: string;
  likes: string[];
  comments: string[];
  createdAt: Date;
}

const Posts: React.FC<{ profileUserId?: string }> = ({ profileUserId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const { state } = useContext(Context);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = profileUserId
          ? await axios.get(
              `http://localhost:5000/post/profileFeed/${profileUserId}`
            )
          : await axios.get(
              `http://localhost:5000/post/userFeed/${state.currentUser._id}`
            );
        setPosts(posts.data.result);
      } catch (error) {
        alert(`Error ${error}`);
      }
    };
    getPosts();
  }, [profileUserId, state.currentUser._id]);

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
        <Post key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default Posts;
