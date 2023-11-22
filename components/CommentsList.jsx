/* eslint-disable react/prop-types */
import { Container, Divider, Stack } from "@mui/material";
import { CommentCard } from "./CommentCard";

export const CommentsList = ({ comments, setComments, showNotification }) => {
  return (
    <Container maxWidth={false} disableGutters style={{ paddingTop: "20px" }}>
      <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
      <Stack mt={1} spacing={2} style={{ width: "100%" }}>
        {comments.map((comment, key) => {
          return (
            <CommentCard
              key={key}
              comment={comment}
              setComments={setComments}
              showNotification={showNotification}
            />
          );
        })}
      </Stack>
    </Container>
  );
};
