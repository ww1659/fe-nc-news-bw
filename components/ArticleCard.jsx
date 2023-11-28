/* eslint-disable react/prop-types */
import { Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

export const ArticleCard = ({ article }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <Paper
      elevation={6}
      style={{
        padding: "16px",
        borderRadius: "10px",
        maxHeight: "100%",
        maxWidth: "350px",
        backgroundColor: "#B8BACF",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">
            {article.topic.slice(0, 1).toUpperCase() +
              article.topic.slice(1, article.topic.length)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={9}
          sm={9}
          md={9}
          lg={9}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Typography variant="overline">{article.author}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
          <Typography
            variant="h6"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal",
              height: "3em",
            }}
          >
            <Link to={`/articles/${article.article_id}`} style={linkStyle}>
              {article.title}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ maxHeight: "15rem" }}>
          <Link to={`/articles/${article.article_id}`}>
            <img
              src={article.article_img_url}
              alt="Image of Article"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10%",
              }}
            />
          </Link>
        </Grid>
        <Grid
          item
          xs={11}
          sm={11}
          md={11}
          lg={11}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            color: "purple",
          }}
        >
          <Typography variant="subtitle1">{article.votes}</Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            color: "purple",
          }}
        >
          <InsertEmoticonIcon />
        </Grid>
      </Grid>
    </Paper>
  );
};
