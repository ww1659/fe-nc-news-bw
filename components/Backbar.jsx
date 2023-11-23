import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

export const Backbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar style={{ backgroundColor: "#798071", boxShadow: "none" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="back button"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
        <Avatar sx={{ ml: "auto" }}>
          <PersonIcon />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};
