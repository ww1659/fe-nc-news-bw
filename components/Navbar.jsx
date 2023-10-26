/* eslint-disable react/prop-types */
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TopicIcon from "@mui/icons-material/Topic";

export const Navbar = ({ setIsDrawerOpen }) => {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#798071" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            key="menu-button"
            onClick={() => setIsDrawerOpen(true)}
          >
            <TopicIcon title="topic list" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/articles"> Home</Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
