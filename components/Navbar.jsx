/* eslint-disable react/prop-types */
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TopicIcon from "@mui/icons-material/Topic";
import { Header } from "./Header";

export const Navbar = ({ setIsDrawerOpen }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#798071" }}>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
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
          <Link to="/" style={linkStyle}>
            <Header />
          </Link>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
