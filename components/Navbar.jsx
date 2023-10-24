import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#798071" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          key="menu-button"
        >
          <ListIcon title="topic list" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/"> NC News</Link>
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
