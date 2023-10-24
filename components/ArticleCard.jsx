/* eslint-disable react/prop-types */
import { Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  return (
    <Paper
      elevation={6}
      style={{
        padding: "16px",
        borderRadius: "4%",
        maxHeight: "100%",
        maxWidth: "400px",
        backgroundColor: "#B8BACF",
      }}
    >
      <Grid container spacing={2} flex={1} flexGrow={1}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography variant="subtitle2">
            {article.topic.slice(0, 1).toUpperCase() +
              article.topic.slice(1, article.topic.length)}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography variant="subtitle2">Author: {article.author}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <img
              src={article.article_img_url}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10%",
              }}
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle2">Votes: {article.votes}</Typography>
      </Grid>
    </Paper>
  );
};
