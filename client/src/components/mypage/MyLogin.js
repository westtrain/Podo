import React from "react";

function MyLogin(props) {
  return (
    <>
      <div className="middlemain">
        <div className="adminlogin">
          <div className="wrapper">
            <div className="title">로그인 관리</div>
            <hr className="loginline" />
            <div className="logininfo">
              <div className="nowlogininfo">현재 연결된 소셜 로그인 계정</div>
              <div className="social">
                Google
                <div className="logoutbtn">로그아웃</div>
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
