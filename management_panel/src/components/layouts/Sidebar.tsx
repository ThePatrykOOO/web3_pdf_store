import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { ListItem } from "@mui/material";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

interface menuItem {
  label: string;
  url: string;
}

export default function Sidebar() {
  const menuItems: Array<menuItem> = [
    {
      label: "Dashboard",
      url: "/",
    },
    {
      label: "Users",
      url: "/users",
    },
    {
      label: "Products",
      url: "/products",
    },
  ];

  return (
    <React.Fragment>
      <Drawer variant="permanent">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        ></Toolbar>
        <Divider />
        <List component="nav">
          {menuItems.map((item: menuItem) => {
            return (
              <React.Fragment key={item.url}>
                <ListItem component={Link} to={item.url}>
                  <ListItemText primary={item.label} />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
