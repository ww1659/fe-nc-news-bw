/* eslint-disable react/prop-types */
import { Avatar, Container, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUserByUsername } from "../utils/api";

const numberOfDays = (datePosted) => {
  const start = new Date(datePosted);
  const today = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = today.getTime() - start.getTime();
  return Math.round(diffInTime / oneDay);
};

export const CommentCard = ({ comment }) => {
  const [userError, setUserError] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState([{}]);

  useEffect(() => {
    setUserLoading(true);
    fetchUserByUsername(comment.author)
      .then((fetchedUser) => {
        setUserLoading(false);
        setUser(fetchedUser);
      })
      .catch((err) => {
        setUserLoading(false);
        setUserError(err);
      });
  }, [comment.author]);

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>User error, sorry.</p>;

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Avatar alt={user[0].username} src={user[0].avatar_url} />
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