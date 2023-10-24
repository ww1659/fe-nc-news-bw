import "./App.css";
import { Header } from "../components/Header";
import { ArticlesList } from "../components/ArticlesList";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { IndividualArticle } from "../components/IndividualArticle";

function App() {
  const [articles, setArticles] = useState([]);

  return (
    <>
      <Routes>
        <Route
          path="/"
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
      </Routes>
    </>
  );
}

export default App;
