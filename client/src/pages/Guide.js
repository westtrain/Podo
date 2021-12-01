import React from "react";
import Header from "../components/public/Header";
import FAQ from "../components/public/FAQ";
import "../style/Guide.scss";

function Guide(props) {
  return (
    <>
      <Header />
      <div className="guidepage">
        <div className="main">
          <FAQ />
        </div>
      </div>
    </>
  );
}

export default Guide;
