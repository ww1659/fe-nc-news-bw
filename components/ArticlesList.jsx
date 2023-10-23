import axios from "axios";
import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Container, Grid } from "@mui/material";

export const ArticlesList = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://bw-news-app.onrender.com/api/articles")
      .then((response) => {
        setIsLoading(false);
        setArticles(response.data.articles);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.msg}</p>;

  return (
    <Container>
      <Grid container spacing={2}>
        {articles.map((article, key) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
              <ArticleCard article={article} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
