import { useState } from "react";
import { useAuth } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  FormControl,
  FormHelperText,
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
  const { login, user } = useAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [showUsername, setShowUsername] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [noNameError, setNoNameError] = useState(false);
  const [noUsernameError, setNoUsernameError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowUsername((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      setNoNameError(!name);
    }

    if (!username) {
      setNoUsernameError(!username);
    }

    if (!name || !username) {
      return;
    } else {
      setLoginLoading(true);
      return login({ name, username })
        .then((response) => {
          setLoginError(false);
          setLoginSuccess(true);
          setTimeout(() => {
            setLoginLoading(false);
            navigate(`/`);
          }, 2000);
          console.log(response);
        })
        .catch((err) => {
          setLoginLoading(false);
          setLoginError(true);
          setLoginSuccess(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "20%" }}
      >
        <Grid item sx={{ marginBottom: "20px" }}>
          <Typography variant="overline" sx={{ fontSize: "24px" }}>
            Log in
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3} alignItems={"center"}>
              <FormControl error variant="standard">
                <TextField
                  id="name-login-field"
                  color="secondary"
                  label="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          edge="end"
                          disable="true"
                          sx={{
                            "&:hover, &:active, &:focus, &:focus-visible": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <AccountCircleIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <FormHelperText id="component-error-text">
                  <span color="red">
                    {noNameError && !name ? "Please provide a name" : null}
                  </span>
                </FormHelperText>
              </FormControl>
              <FormControl error variant="standard">
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
                <FormHelperText id="component-error-text">
                  <span color="red">
                    {noUsernameError && !username
                      ? "Please provide a username"
                      : null}
                  </span>
                </FormHelperText>
              </FormControl>
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
      {loginLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <LinearProgress color="secondary" style={{ width: "300px" }} />
        </Box>
      ) : null}
      {loginError ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <Alert variant="outlined" severity="error">
            <AlertTitle>Login Attempt Failed</AlertTitle>
            Invalid login credentials — <strong>please try again.</strong>
          </Alert>
        </Box>
      ) : null}
      {loginSuccess ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <Alert variant="outlined" severity="success">
            <AlertTitle>Success</AlertTitle>
            Login Successful! Welcome back to NC News,{" "}
            <strong> {user.username}.</strong>
          </Alert>
        </Box>
      ) : null}
    </>
  );
};
