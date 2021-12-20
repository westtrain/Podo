import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/API/userAPI";
import { getUsersPaymentInfo } from "../../redux/API/paymentAPI";
import { setDefaultURI } from "../../redux/reducers/loginURISlice";
function LoginCallBack(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const URIState = useSelector((state) => state.loginURI);

  useEffect(async () => {
    await dispatch(getUser());
    await dispatch(getUsersPaymentInfo());
    await navigate(URIState);
  }, []);
  return <></>;
}

export default LoginCallBack;
