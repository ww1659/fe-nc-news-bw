/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const ArticlesByTopic = () => {
  const { topic } = useParams();

  return <Typography variant="h1">{topic}</Typography>;
};
