import { Label, LocationOn, PermMedia } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Paper, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/contextprovider";
import { v4 as uuidv4 } from "uuid";
import UploadFile from "../../firebase/uploadfile";
import axios from "axios";

const SharePost = () => {
  const captionRef = useRef<HTMLInputElement>();
  const inputFileRef = useRef<HTMLInputElement>();

  const { state, dispatch } = useContext(Context);
  const { currentUser } = state;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const imgName =
        uuidv4() +
          "." +
          inputFileRef.current?.files?.[0].name.split(".").pop() || "jpg";
      const url = await UploadFile(
        inputFileRef.current!.files![0],
        `posts/${currentUser._id}`,
        imgName
      );
      const newPost = await axios.post("http://localhost:5000/post/", {
        userId: currentUser._id,
        caption: captionRef.current?.value,
        img: url,
      });
      dispatch({ type: "UPDATE_POST", payload: newPost.data.post });
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <Paper
      elevation={3}
      component="form"
      sx={{
        color: "#989595",
        borderRadius: 4,
        width: "100%",
        "&:hover": { border: "1px solid #ccc" },
        mt: 2,
      }}
      onSubmit={handleSubmit}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Avatar
          src={state.currentUser.profilePic}
          sx={{ width: 50, height: 50 }}
        />
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <TextField
            label="What's in your mind...?"
            name="caption"
            id="caption"
            inputRef={captionRef}
            sx={{ "& fieldset": { border: "none" }, width: 350 }}
          />
        </Box>
      </Box>
      <Divider variant="middle" sx={{ borderBottomWidth: "2px" }} />
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          component="label"
          startIcon={<PermMedia />}
          sx={{ textTransform: "capitalize" }}
        >
          Photo/Video
          <TextField
            type="file"
            sx={{ display: "none" }}
            inputRef={inputFileRef}
          />
        </Button>
        <Button startIcon={<Label />} sx={{ textTransform: "capitalize" }}>
          Tag
        </Button>
        <Button startIcon={<LocationOn />} sx={{ textTransform: "capitalize" }}>
          Location
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ ml: "auto", textTransform: "capitalize" }}
        >
          Share
        </Button>
      </Box>
    </Paper>
  );
};

export default SharePost;
