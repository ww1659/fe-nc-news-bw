/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { CommentAdder } from "./CommentAdder";
import { useAuth } from "../utils/auth";
import AddCommentIcon from "@mui/icons-material/AddComment";

export const AddCommentBar = ({ setComments, articleId }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {user.role === "user" ? (
        <div style={{ marginTop: "15%" }}>
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
              setComments={setComments}
              open={open}
              setOpen={setOpen}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};
