/* eslint-disable react/prop-types */
import { Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

export const TopicCard = ({ article }) => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <Paper
      elevation={6}
      style={{
        paddingTop: "4px",
        paddingBottom: "4px",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "10px",
        width: "100%",
        backgroundColor: "#B8BACF",
        maxHeight: "12rem",
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={10}
          sm={10}
          md={10}
          lg={10}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Typography variant="overline">{article.author}</Typography>
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
          <Typography variant="caption">{article.votes}</Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
          }}
        >
          <InsertEmoticonIcon fontSize="small" />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} pr={1}>
          <Link to={`/articles/${article.article_id}`}>
            <img
              src={article.article_img_url}
              alt="Image of Article"
              style={{
                maxWidth: "100%",
                maxHeight: "auto",
                borderRadius: "10%",
              }}
            />
          </Link>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8}>
          <Typography
            variant={isSmallScreen ? "subtitle1" : "h6"}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal",
            }}
          >
            <Link to={`/articles/${article.article_id}`} style={linkStyle}>
              {article.title}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
