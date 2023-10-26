import axios from "axios";

const myApi = axios.create({
  baseURL: "https://bw-news-app.onrender.com/api",
});

export const fetchArticles = (query) => {
  return myApi.get(`/articles?topic=${query}`).then((res) => {
    return res.data.articles;
  });
};

export const fetchArticleById = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const fetchComments = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const fetchTopics = () => {
  return myApi.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

export const fetchUserByUsername = (username) => {
  return myApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const updateArticleVotes = (article_id, type) => {
  return myApi
    .patch(`/articles/${article_id}`, { incVotes: type === "up" ? 1 : -1 })
    .then((res) => {
      return res.data.article;
    });
};

export const updateComments = (article_id, newComment) => {
  return myApi
    .post(`/articles/${article_id}/comments`, newComment)
    .then((res) => {
      return res.data.comment;
    });
};
