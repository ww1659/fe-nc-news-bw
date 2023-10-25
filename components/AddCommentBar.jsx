/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useState } from "react";
import { CommentAdder } from "./CommentAdder";

export const AddCommentBar = ({ comments, setComments, articleId }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Grid
        container
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.5%",
          backgroundColor: "#798071",
          marginTop: "10px",
        }}
      >
        <Grid item xs={12}>
          <Button
            variant="text"
            color="inherit"
            startIcon={<AddCommentIcon />}
            style={{ width: "100%" }}
            onClick={() => handleClickOpen()}
          >
            Add Comment
          </Button>
        </Grid>
      </Grid>
      {open ? (
        <CommentAdder
          articleId={articleId}
          comments={comments}
          setComments={setComments}
          open={open}
          setOpen={setOpen}
        />
      ) : null}
    </div>
  );
};
