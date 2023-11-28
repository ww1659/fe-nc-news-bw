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

import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import { fetchTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const TopicDrawer = ({ isTopicDrawerOpen, setIsTopicDrawerOpen }) => {
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
  }, []);

  const handleTopicClick = (topic) => {
    setIsTopicDrawerOpen(false);
    navigate(`/articles/topics/${topic}`);
  };

  return (
    <Drawer
      PaperProps={{
        sx: { bgcolor: "#D2D5DD", width: "50%" },
      }}
      anchor="left"
      open={isTopicDrawerOpen}
      onClose={() => setIsTopicDrawerOpen(false)}
    >
      {isTopicLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : null}
      {topicError ? (
        <Typography>Sorry, there was an error fetching topics</Typography>
      ) : null}
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "left",
          paddingLeft: "10px",
          paddingTop: "10px",
        }}
      >
        <Grid item>
          <Typography variant="h5">Topics</Typography>
        </Grid>
        <Grid item>
          <Divider />
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
          </List>
        </Grid>

        <Grid item>
          <Button
            color="error"
            onClick={() => setIsTopicDrawerOpen(false)}
            startIcon={<CloseIcon />}
          >
            <Typography variant="body2">Close</Typography>
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};
