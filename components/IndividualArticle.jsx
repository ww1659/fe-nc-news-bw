import { Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../utils/api";
import { Backbar } from "./Backbar";
import { CommentsList } from "./CommentsList";
import { ArticleVotes } from "./ArticleVotes";

export const IndividualArticle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState([{}]);
  const { articleId } = useParams();

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Backbar />
      <div style={{ marginTop: 60 }}>
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ArticleVotes votes={article[0].votes} articleId={articleId} />
          </Grid>
        </Grid>
        <CommentsList />
      </div>
    </Container>
  );
};
