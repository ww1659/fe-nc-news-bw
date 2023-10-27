import axios from "axios";

const myApi = axios.create({
  baseURL: "https://bw-news-app.onrender.com/api",
});

export const fetchArticles = (topicQuery, orderQuery, sortQuery, page) => {
  const queries = [];

  if (topicQuery) {
    queries.push(`topic=${topicQuery}`);
  }
  if (sortQuery) {
    queries.push(`sort_by=${sortQuery}`);
  }
  if (orderQuery) {
    queries.push(`order=${orderQuery}`);
  }
  if (page) {
    queries.push(`p=${page}`);
  }

  const path = `/articles${queries.length > 0 ? "?" + queries.join("&") : ""}`;
  return myApi.get(path).then((res) => {
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

export const deleteCommentByCommentId = (comment_id) => {
  return myApi.delete(`/comments/${comment_id}`).then((res) => {
    return res;
  });
};
