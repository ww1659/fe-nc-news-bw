/* eslint-disable react/prop-types */
import {
  Breadcrumbs,
  Chip,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";
import { TopicCard } from "../components/TopicCard";
import { PaginateArticles } from "../components/PaginateArticles";

import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export const ArticlesByTopic = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic, undefined, undefined, page)
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
        setTotalArticles(articles[0].full_count);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [topic, page]);

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
  if (error) return <p>{error.msg}</p>;

  return (
    <Container>
      <div style={{ marginTop: "75px", marginBottom: "10px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to={"/"}>
            <StyledBreadcrumb
              label="Home"
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
          <Link to={`/articles/topics/${topic}`}>
            <StyledBreadcrumb
              label={
                topic.slice(0, 1).toUpperCase() + topic.slice(1, topic.length)
              }
            />
          </Link>
        </Breadcrumbs>
      </div>

      <Grid container spacing={2}>
        {articles.map((article, key) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              key={key}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <TopicCard article={article} />
            </Grid>
          );
        })}
      </Grid>
      <PaginateArticles
        page={page}
        setPage={setPage}
        totalArticles={totalArticles}
      />
    </Container>
  );
};
