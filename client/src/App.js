import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Create from "./pages/Create";
import Search from "./pages/Search";
import Contents from "./pages/Contents";
import Guide from "./pages/Guide";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/:menu" element={<MyPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/:step" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contents" element={<Contents />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
