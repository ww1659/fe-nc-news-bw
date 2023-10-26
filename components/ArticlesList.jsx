/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Container, Grid } from "@mui/material";
import { fetchArticles } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import { FilterArticles } from "./FilterArticles";

export const ArticlesList = ({ articles, setArticles }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const topicQuery = searchParams.get("topic");

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topicQuery)
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [setArticles, topicQuery]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.msg}</p>;

  return (
    <Container>
      <FilterArticles
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
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
