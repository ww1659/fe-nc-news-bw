/* eslint-disable react/prop-types */
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
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
  const isLargeScreen = useMediaQuery("(min-width:1536px)");

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
        sx: {
          bgcolor: "#D2D5DD",
          width: !isLargeScreen ? "200px" : "10%",
          marginTop: isLargeScreen ? "65px" : "0px",
        },
      }}
      anchor="left"
      variant={isLargeScreen ? "permanent" : null}
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
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "left",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "10px",
        }}
      >
        <Grid
          item
          xs={9}
          sm={9}
          md={9}
          lg={9}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Topics</Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {!isLargeScreen ? (
            <IconButton
              color="error"
              onClick={() => setIsTopicDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
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
      </Grid>
    </Drawer>
  );
};
