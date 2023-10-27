/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Container, Grid } from "@mui/material";
import { fetchArticles } from "../utils/api";

export const ArticlesList = ({ searchParams }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const topicQuery = searchParams.get("topic");
  const sortQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topicQuery, orderQuery, sortQuery)
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [topicQuery, orderQuery, sortQuery]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.msg}</p>;

  return (
    <Container>
      <Grid container spacing={2}>
        {articles.map((article, key) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={key}>
              <ArticleCard article={article} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
