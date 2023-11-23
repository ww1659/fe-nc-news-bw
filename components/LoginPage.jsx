import { useState } from "react";
import {
  Button,
  InputAdornment,
  IconButton,
  Grid,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [showUsername, setShowUsername] = useState(false);

  const handleClickShowPassword = () => setShowUsername((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    console.log(name, username);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "70vh" }}
    >
      <Grid item xs={12}>
        <Typography variant="overline" sx={{ fontSize: "24px" }}>
          Log in
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems={"center"}>
            <TextField
              id="name-login-field"
              color="secondary"
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              id="username-login-field"
              type={showUsername ? "text" : "password"}
              color="secondary"
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle username visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showUsername ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="outlined"
              color="inherit"
              sx={{
                width: "50%",
                bgcolor: "secondary.main",
                color: "white",
              }}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};
