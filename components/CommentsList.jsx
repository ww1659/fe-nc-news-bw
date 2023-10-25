/* eslint-disable react/prop-types */
import { Container, Divider, Stack, Typography } from "@mui/material";
import { CommentCard } from "./CommentCard";

export const CommentsList = ({ comments }) => {
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
