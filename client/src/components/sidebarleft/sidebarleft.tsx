import { Drawer, Toolbar } from "@mui/material";

const SideBarLeft = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <div>drawer left</div>
    </Drawer>
  );
};

export default SideBarLeft;
