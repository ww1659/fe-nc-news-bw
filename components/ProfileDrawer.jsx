/* eslint-disable react/prop-types */
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import { useAuth } from "../utils/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileDrawer = ({
  isProfileDrawerOpen,
  setIsProfileDrawerOpen,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      logout();
      navigate("/");
      setIsProfileDrawerOpen(false);
      setLoggingOut(false);
    }, 2500);
  };

  if (isLoggingOut)
    return (
      <Dialog
        fullWidth
        maxWidth="sm"
        open={true}
        keepMounted
        aria-describedby="logging out"
      >
        <DialogTitle>{"Logging you out..."}</DialogTitle>
        <Container
          sx={{
            mt: "5px",
            mb: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Container>
        <DialogContent>
          <Typography>See you soon!</Typography>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer
      anchor="bottom"
      open={isProfileDrawerOpen}
      onClose={() => setIsProfileDrawerOpen(false)}
    >
      <Grid
        container
        style={{
          backgroundColor: "#B8BACF",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingBottom: "3px",
        }}
      >
        <Grid item xs={6} sm={6}>
          <Typography variant="h6">
            Hello, <span style={{ color: "purple" }}>{`${user.name}`}</span>{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Typography variant="overline">{`${user.username}`}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        spacing={1}
        style={{
          backgroundColor: "#e8ebe4",
          display: "flex",
          alignItems: "left",
          padding: "10px",
        }}
      >
        <Grid item>
          <Button color="secondary" startIcon={<ArticleOutlinedIcon />}>
            My Articles <em>(WIP)</em>
          </Button>
        </Grid>
        <Grid item>
          <Button color="secondary" startIcon={<SettingsOutlinedIcon />}>
            Settings <em>(WIP)</em>
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};
