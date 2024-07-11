import { Badge } from "@mui/joy";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { Dispatch, useContext, useEffect, useState } from "react";
import { Context } from "../../../context/contextprovider";

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

interface conversationsProp {
  _id: string;
  members: string[];
}

const ChatsRight: React.FC<{
  userId: string;
  setCurrentChat: Dispatch<React.SetStateAction<conversationsProp | null>>;
}> = ({ userId, setCurrentChat }) => {
  const [user, setUser] = useState<UserProp>();
  const { state } = useContext(Context);
  const { currentUser } = state;

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

  const handleClick = async () => {
    try {
      const conversation = await axios.post(
        "http://localhost:5000/chat/conversation/",
        { members: [currentUser._id, userId] }
      );
      setCurrentChat(conversation.data.conversation);
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Badge badgeInset="14%" color="success">
            <Avatar src={user?.profilePic} />
          </Badge>
        </ListItemAvatar>
        <ListItemText primary={`${user?.firstName} ${user?.lastName}`} />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatsRight;
