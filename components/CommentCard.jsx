/* eslint-disable react/prop-types */
import { Avatar, Container, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUserByUsername } from "../utils/api";
import { DeleteComment } from "./DeleteComment";

const numberOfDays = (datePosted) => {
  const start = new Date(datePosted);
  const today = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = today.getTime() - start.getTime();
  return Math.round(diffInTime / oneDay);
};

export const CommentCard = ({
  comment,
  setComments,
  setCommentCount,
  showNotification,
}) => {
  const [authorError, setAuthorError] = useState(null);
  const [authorLoading, setAuthorLoading] = useState(false);
  const [author, setAuthor] = useState([{}]);

  useEffect(() => {
    setAuthorLoading(true);
    fetchUserByUsername(comment.author)
      .then((fetchedUser) => {
        setAuthorLoading(false);
        setAuthor(fetchedUser);
      })
      .catch((err) => {
        setAuthorLoading(false);
        setAuthorError(err);
      });
  }, [comment.author]);

  if (authorLoading) return <p>Loading...</p>;
  if (authorError) return <p>User error, sorry.</p>;

  return (
    <Container>
      <Grid
        container
        sx={{
          ...(comment.isOptimistic && {
            backgroundColor: "purple",
            opacity: "50%",
          }),
        }}
      >
        <Grid item xs={6}>
          <Avatar alt={author[0].username} src={author[0].avatar_url} />
        </Grid>
        <Grid item xs={6}>
          {comment.author === "cooljmessy" ? (
            <DeleteComment
              comment={comment}
              setComments={setComments}
              setCommentCount={setCommentCount}
              showNotification={showNotification}
            />
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: "bolder" }}>{comment.author}</span>{" "}
            <span style={{ fontWeight: "lighter" }}>
              {numberOfDays(comment.created_at)}d
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">{comment.body}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Votes: {comment.votes}</Typography>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
    </Container>
  );
};
