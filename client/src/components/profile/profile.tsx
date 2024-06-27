import { Avatar, Box, Grid, Paper, Toolbar, Typography } from "@mui/material";
import TopBar from "../topbar/topbar";
import SideBarLeft from "../sidebarleft/sidebarleft";
import SharePost from "../sharepost/sharepost";
import Posts from "../posts/posts";
import { Key, useEffect, useState } from "react";
import ProfileContact from "./profilecontacts";
import { useParams } from "react-router-dom";
import axios from "axios";

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

const ProfilePage = () => {
  const [user, setUser] = useState<UserProp | null>(null);

  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`http://localhost:5000/user/${userId}`);
        setUser(user.data.user);
      } catch (error) {
        alert(`${error}`);
      }
    };
    getUser();
  }, [userId]);

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
              src={user?.coverPic}
              alt="coverImg"
              style={{ width: "100%", height: "260px", objectFit: "cover" }}
            />
            <Avatar
              src={user?.profilePic}
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
              {user?.firstName} {user?.lastName}
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
              <Posts profileUserId={userId!} />
            </Box>
          </Grid>
          <Grid item lg={5}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                User Information
              </Typography>
              <Typography variant="subtitle2">
                {<b>City: </b>} {user?.city}
              </Typography>
              <Typography variant="subtitle2">
                {<b>Relationship: </b>} {user?.relationship}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                User friends
              </Typography>
              <Grid container spacing={2}>
                {user?.following.map((userId: string, idx: Key) => (
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
