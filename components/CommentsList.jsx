import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComments } from "../utils/api";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { CommentCard } from "./CommentCard";

export const CommentsList = () => {
  const [commentError, setCommentError] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const { articleId } = useParams();

  useEffect(() => {
    setCommentsLoading(true);
    fetchComments(articleId)
      .then((fetchedComments) => {
        setCommentsLoading(false);
        setComments(fetchedComments);
      })
      .catch((err) => {
        setCommentsLoading(false);
        setCommentError(err);
      });
  }, [articleId]);

  if (commentsLoading) return <p>Loading...</p>;
  if (commentError) return <p>{commentError}</p>;

  return (
    <Container maxWidth={false} disableGutters style={{ paddingTop: "20px" }}>
      <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
      <Typography variant="h6">Comments</Typography>
      <Stack mt={1} spacing={2} style={{ width: "100%" }}>
        {comments.map((comment, key) => {
          return <CommentCard comment={comment} key={key} />;
        })}
      </Stack>
    </Container>
  );
};
