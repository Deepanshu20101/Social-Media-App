import { Label, LocationOn, PermMedia } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const SharePost = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Paper
      elevation={3}
      sx={{
        cursor: "pointer",
        color: "#989595",
        borderRadius: 4,
        width: "100%",
        "&:hover": { border: "1px solid #ccc" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Avatar />
        <Box component="div" {...getRootProps()} sx={{ flexGrow: 1, ml: 2 }}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: "green" }}>Drop the files here...</p>
          ) : (
            <p>What's in your mind...?</p>
          )}
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
        <Button startIcon={<PermMedia />} sx={{ textTransform: "capitalize" }}>
          Photo/Video
        </Button>
        <Button startIcon={<Label />} sx={{ textTransform: "capitalize" }}>
          Tag
        </Button>
        <Button startIcon={<LocationOn />} sx={{ textTransform: "capitalize" }}>
          Location
        </Button>
        <Button
          variant="contained"
          sx={{ ml: "auto", textTransform: "capitalize" }}
        >
          Share
        </Button>
      </Box>
    </Paper>
  );
};

export default SharePost;
