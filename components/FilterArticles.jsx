/* eslint-disable react/prop-types */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTopics } from "../utils/api";

export const FilterArticles = ({ searchParams, setSearchParams }) => {
  const [topicError, setTopicError] = useState(null);
  const [isTopicLoading, setIsTopicLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [filterTopic, setFilterTopic] = useState("");

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

  const topicSelect = (event) => {
    const newTopic = event.target.value;
    setFilterTopic(newTopic);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", event.target.value);
    setSearchParams(newParams);
  };

  if (isTopicLoading) return <p>Loading...</p>;
  if (topicError) return <p>Error with topics, please refresh</p>;

  return (
    <Stack
      margin={2}
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <FormControl fullWidth>
        <InputLabel color="secondary">Select Topic</InputLabel>
        <Select
          color="secondary"
          value={filterTopic}
          label="Select Topic"
          onChange={topicSelect}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {topics.map((topic, key) => {
            return (
              <MenuItem key={key} value={topic.slug}>
                {topic.slug.slice(0, 1).toUpperCase() +
                  topic.slug.slice(1, topic.slug.length)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Stack>
  );
};
