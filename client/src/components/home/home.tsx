import { Box, Toolbar } from "@mui/material";
import SharePost from "../sharepost/sharepost";

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Toolbar />
        <SharePost />
      </Box>
    </>
  );
};

export default HomePage;
