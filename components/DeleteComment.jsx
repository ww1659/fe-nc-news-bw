/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { deleteCommentByCommentId } from "../utils/api";
import { useState } from "react";

export const DeleteComment = ({
  comment,
  setComments,
  setCommentCount,
  showNotification,
}) => {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (event) => {
    setOpen(false);
    const commentId = event.currentTarget.value;

    setComments((currentComments) => {
      const updatedComments = currentComments.filter((currentComment) => {
        return currentComment.comment_id !== Number(commentId);
      });

      return updatedComments;
    });

    setCommentCount((currentCount) => {
      return --currentCount;
    });

    deleteCommentByCommentId(commentId)
      .then(() => {
        setError(false);
        showNotification("Comment deleted :)");
      })
      .catch((err) => {
        setError(err);
      });
  };

  if (error)
    return (
      <Typography variant="body1">
        {error.response.data.status}
        {error.response.data.msg}
      </Typography>
    );

  return (
    <div>
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          aria-label="delete button"
          onClick={handleClickOpen}
          sx={{
            "&:hover": {
              color: "purple",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-comment-delete"
        aria-describedby="alert-delete-comment"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "purple",
          }}
        >
          <DialogTitle color="white">{"Warning"}</DialogTitle>
          <IconButton
            size="large"
            aria-label="cancel button"
            onClick={handleClose}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your comment? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            color="secondary"
            variant="outlined"
            value={comment.comment_id}
            sx={{
              borderColor: "purple",
              mt: "5%",
              ":hover": {
                bgcolor: "secondary.main",
                color: "white",
              },
            }}
          >
            DELETE Comment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
