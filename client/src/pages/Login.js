import React from "react";
import { useDispatch, useSelector } from "react-redux";
import naver from "../image/naver.png";
import kakao from "../image/kakao.png";
import google from "../image/google.png";
import { getUser } from "../redux/API/userAPI";

const Login = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const getCookie = function (name) {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  };
  const cookie = getCookie("jwt");
  const onClickNaver = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/naver`; //
  };
  const onClickKakao = async () => {
    //window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`;
  };
  const onClickGoogle = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <>
      <a>
        <img src={naver} onClick={onClickNaver} />
        <img src={kakao} onClick={onClickKakao} />
        <img src={google} onClick={onClickGoogle} />
      </a>
      {userState !== null ? <div>{userState.name}</div> : null}
      {cookie !== null ? <div>{userState.name}</div> : <div>없다</div>}
    </>
  );
};

export default Login;
