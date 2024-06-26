import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

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

const ProfileContact: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<UserProp>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const foundUser = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setUser(foundUser.data.user);
      } catch (error) {
        alert(`${error}`);
      }
    };
    getUser();
  }, [userId]);
  return (
    <Grid item lg={4}>
      <img
        src={user?.profilePic}
        style={{
          width: "100%",
          height: "100px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />
      <Typography variant="body1">
        {user?.firstName} {user?.lastName}
      </Typography>
    </Grid>
  );
};

export default ProfileContact;
