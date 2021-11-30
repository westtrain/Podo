import React from "react";
import naver from "../image/naver.png";
import kakao from "../image/kakao.png";
import google from "../image/google.png";

const Login = (props) => {
  const onClickNaver = async () => {
    window.location.href = "http://localhost:4000/auth/naver";
  };
  const onClickKakao = async () => {
    window.location.href = "http://localhost:4000/auth/kakao";
  };
  const onClickGoogle = async () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <>
      <a>
        <img src={naver} onClick={onClickNaver} />
        <img src={kakao} onClick={onClickKakao} />
        <img src={google} onClick={onClickGoogle} />
      </a>
    </>
  );
};

export default Login;
