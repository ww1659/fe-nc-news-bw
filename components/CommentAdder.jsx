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
import { useAuth } from "../utils/auth";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CommentAdder = ({ articleId, setComments, open, setOpen }) => {
  const [formError, setFormError] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { user } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setOpen(false);
    const addedComment = {
      body: userInput,
      username: user.username,
    };

    setComments((currentComments) => {
      return [
        {
          body: userInput,
          votes: 0,
          author: addedComment.username,
          created_at: Date.now(),
          isOptimistic: true,
        },
        ...currentComments,
      ];
    });

    updateComments(articleId, addedComment)
      .then((response) => {
        console.log(response, "RESPONSE FROM API");
      })
      .catch((err) => {
        setFormError(err);
      });
    setUserInput("");
  };

  if (formError)
    return (
      <Typography variant="subtitle2">
        Sorry, your comment was not posted. Please try again.
      </Typography>
    );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="add-comment"
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
