import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/reducers/userSlice";

function MyLogin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">로그인 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="nowlogininfo">현재 연결된 소셜 로그인 계정</div>
              <div className="social">
                Google
                <div
                  className="logoutbtn"
                  onClick={() => {
                    dispatch(logOut());
                    return navigate("/");
                  }}
                >
                  로그아웃
                </div>
              </div>
            </div>
            <div className="withdrawal">탈퇴하기</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyLogin;
