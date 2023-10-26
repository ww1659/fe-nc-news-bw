/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { fetchTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const TopicDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const [topics, setTopics] = useState([]);
  const [topicError, setTopicError] = useState(null);
  const [isTopicLoading, setIsTopicLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsTopicLoading(true);
    fetchTopics()
      .then((topics) => {
        setIsTopicLoading(false);
        setTopics(topics);
      })
      .catch((err) => {
        setIsTopicLoading(false);
        setTopicError(err);
      });
  }, [setTopics]);

  const handleTopicClick = (topic) => {
    console.log(topic);
    navigate(`/articles/topics/${topic}`);
  };

  return (
    <Drawer
      PaperProps={{
        sx: { bgcolor: "#D2D5DD", width: "50%" },
      }}
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      {isTopicLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : null}
      {topicError ? (
        <Typography>Sorry, there was an error fetching topics</Typography>
      ) : null}
      <List>
        {topics.map((topic, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleTopicClick(topic.slug)}>
              <ListItemText
                primary={
                  topic.slug.slice(0, 1).toUpperCase() +
                  topic.slug.slice(1, topic.slug.length)
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <Grid container spacing={2} justifyContent="left">
          <Grid item>
            <Button
              color="secondary"
              variant="text"
              onClick={() => setIsDrawerOpen(false)}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </List>
    </Drawer>
  );
};
