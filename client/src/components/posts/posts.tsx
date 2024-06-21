import { Box } from "@mui/material";
import Post from "../post/post";

const Posts = () => {
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
