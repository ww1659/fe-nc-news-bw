/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Container, Divider, Stack, Typography } from "@mui/material";
import { CommentCard } from "./CommentCard";
import { useEffect, useRef, useState } from "react";

export const CommentsList = ({
  comments,
  setComments,
  commentCount,
  setCommentCount,
  showNotification,
  notification,
}) => {
  const [visibleComments, setVisibleComments] = useState(5);
  const observerRef = useRef(null);
  console.log(observerRef);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
        }
      });
    }, observerOptions);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return (
    <Container maxWidth={false} disableGutters style={{ paddingTop: "20px" }}>
      <Typography variant="overline">
        Total Comments:{" "}
        <span
          style={{
            color: notification.visible ? "purple" : "initial",
            fontWeight: notification.visible ? "bold" : "normal",
            transition: "color 0.5s",
          }}
        >
          {commentCount}
        </span>
      </Typography>
      <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
      <Stack mt={1} spacing={2} style={{ width: "100%" }}>
        {comments.slice(0, visibleComments).map((comment, key) => {
          return (
            <CommentCard
              key={key}
              comment={comment}
              setComments={setComments}
              setCommentCount={setCommentCount}
              showNotification={showNotification}
            />
          );
        })}
        <div
          ref={observerRef}
          style={{ height: "1px", background: "transparent" }}
        />
      </Stack>
    </Container>
  );
};
