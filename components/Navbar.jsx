/* eslint-disable react/prop-types */
import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import TopicIcon from "@mui/icons-material/Topic";
import PersonIcon from "@mui/icons-material/Person";

export const Navbar = ({ setIsDrawerOpen }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div style={{ marginBottom: "70px" }}>
      <AppBar position="fixed" style={{ backgroundColor: "#798071" }}>
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
          <Link to="/login">
            <Avatar sx={{ ml: "auto" }}>
              <PersonIcon />
            </Avatar>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
