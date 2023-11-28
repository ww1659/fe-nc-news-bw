/* eslint-disable react/prop-types */
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTopics } from "../utils/api";

export const FilterArticles = ({ searchParams, setSearchParams }) => {
  const [topicError, setTopicError] = useState(null);
  const [isTopicLoading, setIsTopicLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [filterTopic, setFilterTopic] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
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

  const topicSelect = (event) => {
    event.preventDefault();
    const newTopic = event.target.value;
    setFilterTopic(newTopic);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", newTopic);
    setSearchParams(newParams);
  };

  const handleSort = (event) => {
    event.preventDefault();
    const newSort = event.target.value;
    setSortBy(newSort);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", event.target.value);
    setSearchParams(newParams);
  };

  const handleOrder = (event) => {
    event.preventDefault();
    const newOrder = event.target.value;
    setOrderBy(newOrder);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", event.target.value);
    setSearchParams(newParams);
  };

  if (isTopicLoading) return <p></p>;
  if (topicError) return <p>Error with topics, please refresh</p>;

  return (
    <Container>
      {" "}
      <Grid container spacing={2} sx={{ mt: 0, mb: 2 }}>
        <Grid item xs={12} lg={6} alignItems="center" justifyContent="center">
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
        </Grid>
        <Grid item xs={6} lg={3}>
          <FormControl fullWidth>
            <InputLabel color="secondary">Sort</InputLabel>
            <Select
              color="secondary"
              value={sortBy}
              label="Sort"
              onChange={handleSort}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"created_at"}>Date</MenuItem>
              <MenuItem value={"comment_count"}>Comments</MenuItem>
              <MenuItem value={"votes"}>Votes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} lg={3}>
          <FormControl fullWidth>
            <InputLabel color="secondary">Order</InputLabel>
            <Select
              color="secondary"
              value={orderBy}
              label="Order"
              onChange={handleOrder}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"asc"}>Ascending</MenuItem>
              <MenuItem value={"desc"}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};
