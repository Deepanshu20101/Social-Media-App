import { Box, Toolbar } from "@mui/material";
import SharePost from "../sharepost/sharepost";
import TopBar from "../topbar/topbar";
import SideBarLeft from "../sidebarleft/sidebarleft";
import SideBarRight from "../sidebarright/sidebarright";
import Posts from "../posts/posts";

const HomePage = () => {
  return (
    <>
      <TopBar />
      <SideBarLeft />
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
        <Posts profile={false} />
      </Box>
      <SideBarRight />
    </>
  );
};

export default HomePage;
