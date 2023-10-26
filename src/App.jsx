import "./App.css";
import { Header } from "../components/Header";
import { ArticlesList } from "../components/ArticlesList";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { IndividualArticle } from "../components/IndividualArticle";
// import { TopicDrawer } from "../components/TopicDrawer";
// import { ArticlesByTopic } from "../components/ArticlesByTopic";
import { FilterArticles } from "../components/FilterArticles";

function App() {
  const [articles, setArticles] = useState([]);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* <TopicDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      /> */}
      <Routes>
        <Route
          path="/articles"
          element={
            <>
              <Navbar />
              <Header />
              <ArticlesList articles={articles} setArticles={setArticles} />
            </>
          }
        ></Route>
        <Route
          path={`/articles/:articleId`}
          element={<IndividualArticle />}
        ></Route>
        {/* <Route
          path={"/articles/topics/:topic"}
          element={
            <>
              <Navbar setIsDrawerOpen={setIsDrawerOpen} />
              <ArticlesByTopic />
            </>
          }
        ></Route> */}
      </Routes>
    </>
  );
}

export default App;
