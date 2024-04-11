# NC News

Welcome! This is my initial attempt at creating a frontend news site with React, using the MUI library for layout & styling. The app connects to the API previously developed here [bw-news-app.onrender.com](bw-news-app.onrender.com) to serve information on articles, topics, users and comments.

## Hosted Version

You can access the hosted version of the project at [https://bw-nc-news.netlify.app/](https://bw-nc-news.netlify.app/). For logging in, use the following test credentials.

Name: Jess Jelly

Username: jessjelly

It is not the most beautiful looking application, but this project did give me a chance to understand how to use MUI and implement a responsive webpage. 

## Table of Contents

- [Features](#features)
- [Instructions](#instructions)

## Features

- User Authentication: Allow users to register and log in and log out with personalised accounts.

- Responsive Design on various devices.

- Optimistic Rendering of elements to provide a smoother UI/UX.

- Sorting and Filtering: Implement sorting and filtering options for articles based on topics, dates, or other criteria.

- Article Listing: Display a list of articles with titles, authors, and topics.

- Article Details: Provide detailed views for individual articles, including content, images, and comments.

- User Interaction: Allow users to vote and comment on articles.

- Loading Indicators and lazy loading (of comments): Include loading indicators to enhance the user experience during data fetching.

### Instructions

1. Initialize the project as a Node project:

```
npm init -y
```

Before you begin, ensure you have met the following requirements:

2. For dependencies:

```
npm install axios, react, react-router-dom
```

3. Scripts can be found in the `package.json`. To build and deploy the app to your localhost, run the 'dev' script.

```
npm run dev
```

Once you have done this, you will be able to see this development project at the following address: http://localhost:5173/

Cheers! You're now ready to use and test this REACT project.
