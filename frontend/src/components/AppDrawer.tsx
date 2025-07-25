import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Tooltip, IconButton } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { PATH_DASHBOARD, PATH_FAVORITES, LABEL_DASHBOARD, LABEL_FAVORITES } from "../constants/appConstants";

const drawerWidth = 220;

const navItems = [
  {
    label: LABEL_DASHBOARD,
    path: PATH_DASHBOARD,
    icon: <MovieIcon />,
  },
  {
    label: LABEL_FAVORITES,
    path: PATH_FAVORITES,
    icon: <FavoriteIcon />,
  },
];

const AppDrawer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  // Open drawer on hover or menu button click
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Mini menu icon button fixed on the left */}
      <Box sx={{ position: "fixed", top: 16, left: 16, zIndex: 1301 }}>
        <IconButton onMouseEnter={handleDrawerOpen} onClick={handleDrawerOpen} sx={{ color: "primary.light" }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: (theme) => theme.palette.gradients.darkPrimary,
            color: (theme) => theme.palette.text.primary,
            borderRight: 0,
          },
        }}
        onMouseLeave={handleDrawerClose}
      >
        <Toolbar sx={{ minHeight: 56, justifyContent: "flex-start" }}>
          <Box sx={{ fontWeight: 700, fontSize: 20, color: "primary.light", pl: 1, pt: 10}}>
            MovieApp
          </Box>
        </Toolbar>
        <List>
          {navItems.map((item) => (
            <Tooltip key={item.path} title={item.label} placement="right">
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  handleDrawerClose();
                }}
                sx={{
                  borderRadius: 2,
                  my: 1,
                  mx: 2,
                  color: "inherit",
                  minHeight: 48,
                  "&.Mui-selected": {
                    background: (theme) => theme.palette.action.selected,
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 0, mr: 2, justifyContent: "center" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppDrawer;