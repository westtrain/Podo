import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/API/userAPI";

function LoginCallBack(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    await dispatch(getUser()).unwrap();
    console.log("로그인을 완료했습니다");
  });
  return <></>;
}

export default LoginCallBack;
