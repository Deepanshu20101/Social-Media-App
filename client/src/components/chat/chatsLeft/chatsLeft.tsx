import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
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

const ChatsLeft: React.FC<{ userId: string }> = ({ userId }) => {
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
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar src={user?.profilePic} />
        </ListItemAvatar>
        <ListItemText primary={`${user?.firstName} ${user?.lastName}`} />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatsLeft;
