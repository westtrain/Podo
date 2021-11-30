import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const onClickNaver = async () => {
    window.location.href = "http://localhost:4000/auth/naver";
  };

  return (
    <>
      <a>
        <img
          height="100"
          src="http://static.nid.naver.com/oauth/small_g_in.PNG"
          onClick={onClickNaver}
        />
      </a>
    </>
  );
};

export default Login;
