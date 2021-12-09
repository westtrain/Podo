import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/API/userAPI";

function LoginCallBack(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const userState = useSelector((state) => state.user);

  useEffect(async () => {
    await dispatch(getUser());
    navigate("/");
  }, []);
  return <></>;
}

export default LoginCallBack;
