import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/public/Header";

function Create(props) {
  const { step } = useParams(); // URL params로 받은 파티 만들기 스텝

  return (
    <>
      <Header />
      {/* 여기부터 헤더 아래 */}
    </>
  );
}

export default Create;
