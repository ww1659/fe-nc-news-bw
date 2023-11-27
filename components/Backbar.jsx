/* eslint-disable react/prop-types */
import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

export const Backbar = ({ setIsProfileDrawerOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <AppBar style={{ backgroundColor: "#798071", boxShadow: "none" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="back button"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
        {user.role === "guest" ? (
          <Link to="/login">
            <Avatar sx={{ ml: "auto" }}>
              <PersonIcon />
            </Avatar>
          </Link>
        ) : (
          <div onClick={() => setIsProfileDrawerOpen(true)}>
            <Avatar sx={{ ml: "auto" }}>
              <img
                src={user.avatar}
                alt="User Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Avatar>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
