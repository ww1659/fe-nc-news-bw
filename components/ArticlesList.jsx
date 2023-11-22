/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Container, Grid } from "@mui/material";
import { fetchArticles } from "../utils/api";
import { PaginateArticles } from "./PaginateArticles";

export const ArticlesList = ({ searchParams }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);

  const topicQuery = searchParams.get("topic");
  const sortQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topicQuery, orderQuery, sortQuery, page)
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
        setTotalArticles(articles[0].full_count);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [topicQuery, orderQuery, sortQuery, page]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.msg}</p>;

  return (
    <Container>
      <PaginateArticles
        page={page}
        setPage={setPage}
        totalArticles={totalArticles}
      />
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
