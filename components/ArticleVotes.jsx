/* eslint-disable react/prop-types */
import { Grid, IconButton, Typography } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useEffect, useState } from "react";
import { fetchArticleById, updateArticleVotes } from "../utils/api";

export const ArticleVotes = ({ votes, articleId }) => {
  const [articleVoteCount, setArticleVoteCount] = useState(votes);
  const [error, setError] = useState(null);
  const [toggleUpButton, setToggleUpButton] = useState(false);
  const [toggleDownButton, setToggleDownButton] = useState(false);

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
      <Grid item xs={8} sm={8} md={3} lg={2}>
        <Typography variant="h6">Article votes: {articleVoteCount}</Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={1} lg={1}>
        <IconButton
          color={toggleUpButton ? "primary" : "inherit"}
          aria-label="like button"
          onClick={() => handleVotes("up")}
          disabled={toggleUpButton}
        >
          <ThumbUpOffAltIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2} sm={2} md={1} lg={1}>
        <IconButton
          color={toggleDownButton ? "primary" : "inherit"}
          aria-label="dislike button"
          onClick={() => handleVotes("down")}
          disabled={toggleDownButton}
        >
          <ThumbDownOffAltIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
