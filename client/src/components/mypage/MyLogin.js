import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/API/userAPI";
import { logOut } from "../../redux/reducers/userSlice";

function MyLogin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
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
                {userState.socialType}
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
            <div
              className="withdrawal"
              onClick={() => {
                deleteUser();
                dispatch(logOut());
                return navigate("/");
              }}
            >
              탈퇴하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyLogin;
