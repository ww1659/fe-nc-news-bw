import "./App.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { ArticlesList } from "../components/ArticlesList";
import { Navbar } from "../components/Navbar";
import { IndividualArticle } from "../components/IndividualArticle";
import { FilterArticles } from "../components/FilterArticles";
import { LoginPage } from "../components/LoginPage";
import { ProfileDrawer } from "../components/ProfileDrawer";
// import { TopicDrawer } from "../components/TopicDrawer";
// import { ArticlesByTopic } from "../components/ArticlesByTopic";

function App() {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {/* <TopicDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      /> */}
      {
        <ProfileDrawer
          isProfileDrawerOpen={isProfileDrawerOpen}
          setIsProfileDrawerOpen={setIsProfileDrawerOpen}
        />
      }
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar
                isProfileDrawerOpen={isProfileDrawerOpen}
                setIsProfileDrawerOpen={setIsProfileDrawerOpen}
              />
              <FilterArticles
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              <ArticlesList searchParams={searchParams} />
            </>
          }
        ></Route>
        <Route
          path={`/login`}
          element={
            <>
              <Navbar /> <LoginPage />
            </>
          }
        ></Route>
        <Route
          path={`/articles/:articleId`}
          element={
            <IndividualArticle
              setIsProfileDrawerOpen={setIsProfileDrawerOpen}
            />
          }
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
