import { Avatar, Box, Grid, Paper, Toolbar, Typography } from "@mui/material";
import TopBar from "../topbar/topbar";
import SideBarLeft from "../sidebarleft/sidebarleft";
import SharePost from "../sharepost/sharepost";
import Posts from "../posts/posts";
import { Key, useContext } from "react";
import { Context } from "../../context/contextprovider";
import ProfileContact from "./profilecontacts";

const ProfilePage = () => {
  const { state } = useContext(Context);
  const { currentUser } = state;
  console.log(currentUser);

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
        <Box sx={{ width: "100%", position: "relative", mb: 2 }}>
          <Box sx={{ height: "320px" }}>
            <img
              src={currentUser.coverPic}
              alt="coverImg"
              style={{ width: "100%", height: "260px", objectFit: "cover" }}
            />
            <Avatar
              src={currentUser.profilePic}
              sx={{
                height: 160,
                width: 160,
                position: "absolute",
                top: 150,
                left: 0,
                right: 0,
                margin: "auto",
                border: "3px solid white",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography variant="body1">User biography</Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item lg={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SharePost />
              <Posts profile={true} />
            </Box>
          </Grid>
          <Grid item lg={5}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                User Information
              </Typography>
              <Typography variant="subtitle2">
                {<b>City: </b>} {currentUser.city}
              </Typography>
              <Typography variant="subtitle2">
                {<b>Relationship: </b>} {currentUser.relationship}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                User friends
              </Typography>
              <Grid container spacing={2}>
                {currentUser.following.map((userId: string, idx: Key) => (
                  <ProfileContact userId={userId} key={idx} />
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
