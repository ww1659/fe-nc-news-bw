/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CloseIcon from "@mui/icons-material/Close";
import { updateComments } from "../utils/api";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CommentAdder = ({ articleId, setComments, open, setOpen }) => {
  const [userInput, setUserInput] = useState("");
  const [formError, setFormError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    const newComment = {
      body: userInput,
      username: "cooljmessy",
    };
    updateComments(articleId, newComment)
      .then((response) => {
        setComments((currentComments) => {
          return [{ ...currentComments }, response];
        });
      })
      .catch((err) => {
        setFormError(err);
      });
    setUserInput("");
  };

  if (formError) return <Typography>Sorry, please try again.</Typography>;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          backgroundColor: "purple",
        }}
      >
        <IconButton
          size="large"
          color="inherit"
          aria-label="back button"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogTitle>{"Add comment"}</DialogTitle>{" "}
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ marginTop: "3%" }}>
          <TextField
            required
            id="outlined-multiline-static"
            label="Your comment"
            multiline
            rows={7}
            fullWidth
            color="secondary"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <Button
            type="submit"
            variant="outlined"
            color="inherit"
            startIcon={<PostAddIcon />}
            sx={{
              mt: "5%",
              ":hover": {
                bgcolor: "secondary.main",
                color: "white",
              },
            }}
          >
            POST
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};