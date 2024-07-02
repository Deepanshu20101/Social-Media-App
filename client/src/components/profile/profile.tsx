import { Avatar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import TopBar from "../topbar/topbar";
import SideBarLeft from "../sidebarleft/sidebarleft";
import SharePost from "../sharepost/sharepost";
import Posts from "../posts/posts";
import { Key, useContext, useEffect, useState } from "react";
import ProfileContact from "./profilecontacts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/contextprovider";
import { PersonAdd, PersonRemove } from "@mui/icons-material";

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
  const { userId } = useParams();
  const { state, dispatch } = useContext(Context);
  const { currentUser } = state;

  const [user, setUser] = useState<UserProp | null>(null);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(userId)
  );

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

  const handleFollow = async () => {
    try {
      if (!followed) {
        await axios.put(`http://localhost:5000/user/follow/${userId}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW_USER", payload: userId });
      } else {
        await axios.put(`http://localhost:5000/user/unfollow/${userId}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW_USER", payload: userId });
      }
      setFollowed(!followed);
    } catch (error) {
      alert(`${error}`);
    }
  };

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
              {userId === currentUser._id && <SharePost />}
              <Posts profileUserId={userId!} />
            </Box>
          </Grid>
          <Grid item lg={5}>
            {currentUser._id !== userId && (
              <Button
                variant="contained"
                endIcon={followed ? <PersonRemove /> : <PersonAdd />}
                sx={{ mb: 2, mt: 1, textTransform: "capitalize" }}
                onClick={handleFollow}
              >
                {followed ? "Unfollow" : "Follow"}
              </Button>
            )}

            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
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
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
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
