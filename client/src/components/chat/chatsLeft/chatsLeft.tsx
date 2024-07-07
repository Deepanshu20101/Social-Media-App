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
  members: [];
}

const ChatsLeft: React.FC<{
  conversation: conversationsProp;
  setCurrentChat: Dispatch<React.SetStateAction<conversationsProp | undefined>>;
}> = ({ conversation, setCurrentChat }) => {
  const { state } = useContext(Context);
  const [user, setUser] = useState<UserProp>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const foundUser = await axios.get(
          `http://localhost:5000/user/${conversation.members.find(
            (m) => m !== state.currentUser._id
          )}`
        );
        setUser(foundUser.data.user);
      } catch (error) {
        alert(`${error}`);
      }
    };
    getUser();
  }, [conversation]);

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          setCurrentChat(conversation);
        }}
      >
        <ListItemAvatar>
          <Avatar src={user?.profilePic} />
        </ListItemAvatar>
        <ListItemText primary={`${user?.firstName} ${user?.lastName}`} />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatsLeft;
