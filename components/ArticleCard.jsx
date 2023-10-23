/* eslint-disable react/prop-types */
import { Grid, Paper, Typography } from "@mui/material";

export const ArticleCard = ({ article }) => {
  return (
    <Paper
      elevation={6}
      style={{
        padding: "16px",
        borderRadius: "4%",
        maxHeight: "100%",
        maxWidth: "400px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Topic: {article.topic}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Author: {article.author}</Typography>
        </Grid>{" "}
        <Grid item xs={6}>
          <Typography>
            <img
              className="article-img"
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
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {article.title}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
