/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { fetchArticleById, updateArticleVotes } from "../utils/api";
import { useAuth } from "../utils/auth.js";

import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export const ArticleVotes = ({ votes, articleId }) => {
  const [articleVoteCount, setArticleVoteCount] = useState(votes);
  const [error, setError] = useState(null);
  const [toggleUpButton, setToggleUpButton] = useState(false);
  const [toggleDownButton, setToggleDownButton] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchArticleById(articleId).then((updatedArticle) => {
      setArticleVoteCount(updatedArticle[0].votes);
    });
  }, [articleId, votes]);

  const handleVotes = (type) => {
    if (type === "up") {
      setToggleUpButton(true);
      setToggleDownButton(false);
      setArticleVoteCount((currentVotes) => currentVotes + 1);
      setError(null);
    } else if (type === "down") {
      setToggleUpButton(false);
      setToggleDownButton(true);
      setError(null);
      setArticleVoteCount((currentVotes) => currentVotes - 1);
    }
    updateArticleVotes(articleId, type).catch((err) => {
      console.log(err);
      setError("Something went wrong, please refresh...");
      setArticleVoteCount((currentCount) =>
        type === "up" ? currentCount - 1 : currentCount + 1
      );
    });
  };

  if (error) return <p>{error}</p>;

  return (
    <Grid container sx={{ display: "flex", alignItems: "center" }}>
      <Grid
        item
        xs={8}
        sm={5}
        md={3}
        lg={3}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Article votes: {articleVoteCount}</Typography>
      </Grid>
      {user.role === "user" ? (
        <>
          <Grid
            item
            xs={2}
            sm={1}
            md={1}
            lg={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color={toggleUpButton ? "primary" : "inherit"}
              aria-label="like button"
              onClick={() => handleVotes("up")}
              disabled={toggleUpButton}
            >
              <ThumbUpOffAltIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={2}
            sm={1}
            md={1}
            lg={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color={toggleDownButton ? "primary" : "inherit"}
              aria-label="dislike button"
              onClick={() => handleVotes("down")}
              disabled={toggleDownButton}
            >
              <ThumbDownOffAltIcon />
            </IconButton>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};
