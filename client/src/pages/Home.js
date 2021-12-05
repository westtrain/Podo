import React from "react";
import Header from "../components/public/Header";
import "../style/Home.scss";

function Home(props) {
  return (
    <>
      <Header />
      <div className="banner">
        m
        <div className="wrapper">
          <span>
            넷플릭스 한달 요금으로
            <br />
            왓챠, 웨이브, 디즈니플러스까지
          </span>
        </div>
      </div>
    </>
  );
}

export default Home;
