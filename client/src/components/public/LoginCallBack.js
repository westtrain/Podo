import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/API/userAPI";
import { getUsersPaymentInfo } from "../../redux/API/paymentAPI";

function LoginCallBack(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getUser());
    await dispatch(getUsersPaymentInfo());
    navigate("/");
  }, []);
  return <></>;
}

export default LoginCallBack;
