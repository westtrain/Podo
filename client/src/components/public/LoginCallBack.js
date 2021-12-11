import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/API/userAPI";

function LoginCallBack(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {
    console.log("고고");
    await dispatch(getUser());
    navigate("/");
  }, []);
  return <></>;
}

export default LoginCallBack;
