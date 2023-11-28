/* eslint-disable react/prop-types */
import { IconButton, Tooltip } from "@mui/material";
import { useAuth } from "../utils/auth";
import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { CommentAdder } from "./CommentAdder";

export const AddCommentButton = ({ setComments, articleId }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {user.role === "user" ? (
        <div>
          <Tooltip title="Add Comment">
            <IconButton
              sx={{
                backgroundColor: "purple",
                color: "white",
                border: "2px solid purple",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  color: "white",
                  backgroundColor: "purple",
                  boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => handleClickOpen()}
            >
              <AddIcon></AddIcon>
            </IconButton>
          </Tooltip>
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
