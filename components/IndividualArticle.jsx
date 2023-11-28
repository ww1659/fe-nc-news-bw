/* eslint-disable react/prop-types */
import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, fetchComments } from "../utils/api";
import { Backbar } from "./Backbar";
import { CommentsList } from "./CommentsList";
import { ArticleVotes } from "./ArticleVotes";
import { AddCommentBar } from "./AddCommentBar";

import CloseIcon from "@mui/icons-material/Close";
import { AddCommentButton } from "./AddCommentButton";

export const IndividualArticle = ({ setIsProfileDrawerOpen }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [article, setArticle] = useState([{}]);
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
  });
  const { articleId } = useParams();
  const isMediumScreen = useMediaQuery("(min-width:600px)");

  const showNotification = (message) => {
    setNotification({ message, visible: true });

    setTimeout(() => {
      setNotification({ message: "", visible: false });
    }, 10000);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchComments(articleId)
      .then((fetchedComments) => {
        setIsLoading(false);
        setComments(fetchedComments.comments);
        setCommentCount(fetchedComments.commentCount);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [articleId]);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(articleId)
      .then((fetchedArticle) => {
        setIsLoading(false);
        setArticle(fetchedArticle);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [articleId]);

  if (isLoading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress color="secondary"></CircularProgress>
      </Container>
    );
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Backbar setIsProfileDrawerOpen={setIsProfileDrawerOpen} />
      <div style={{ marginTop: 70 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="overline">{article[0].topic}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h4">{article[0].title}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="caption">
              {new Date(article[0].created_at).toLocaleDateString("en-GB")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <img
              src={article[0].article_img_url}
              alt={`Image related to the topic: ${article[0].topic}`}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10%",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="caption">
              Written by: {article[0].author}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="body1">{article[0].body}</Typography>
          </Grid>
          <Grid item xs={12} sm={10} md={10} lg={10}>
            <ArticleVotes votes={article[0].votes} articleId={articleId} />
          </Grid>
          {isMediumScreen ? (
            <div
              style={{
                position: "fixed",
                bottom: "5%",
                right: "7%",
              }}
            >
              <AddCommentButton
                articleId={articleId}
                setComments={setComments}
              />
            </div>
          ) : null}
        </Grid>
        <CommentsList
          comments={comments}
          setComments={setComments}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
          showNotification={showNotification}
          notification={notification}
        />
      </div>
      {notification.visible ? (
        <div
          style={{
            border: "solid 2px black",
            position: "fixed",
            bottom: "10%",
            left: "10%",
            right: "10%",
            zIndex: 999,
          }}
        >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setNotification({ message: "", visible: false });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            open={notification.visible}
          >
            {notification.message}
          </Alert>
        </div>
      ) : null}
      {!isMediumScreen ? (
        <AddCommentBar articleId={articleId} setComments={setComments} />
      ) : null}
    </Container>
  );
};
