import { Drawer, Toolbar } from "@mui/material";

const SideBarRight = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <div>drawer right</div>
    </Drawer>
  );
};

export default SideBarRight;
