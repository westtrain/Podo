import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/API/userAPI";
import { Link } from "react-router-dom";
import { showLoginModal } from "../../redux/reducers/modalSlice";
import LoginModal from "../modal/LoginModal";
import "../../style/App.scss";
import logo from "../../image/Podo_logo.svg";
import profile0 from "../../image/profile0.svg";
import profile1 from "../../image/profile1.svg";
import profile2 from "../../image/profile2.svg";
import profile3 from "../../image/profile3.svg";
import profile4 from "../../image/profile4.svg";
import profile5 from "../../image/profile5.svg";
import profile6 from "../../image/profile6.svg";
import profile7 from "../../image/profile7.svg";
import profile8 from "../../image/profile8.svg";
import profile9 from "../../image/profile9.svg";
import profile10 from "../../image/profile10.svg";
import profile11 from "../../image/profile11.svg";

function Header(props) {
  const dispatch = useDispatch();
  const loginModalState = useSelector((state) => state.modal.loginModal);
  const isLogin = useSelector((state) => state.user !== null);
  const userState = useSelector((state) => state.user);
  const [profileImg, setProfileImg] = useState(profile0);
  const selectProfileModalState = useSelector(
    (state) => state.modal.selectProfileImageModal
  );
  // const getUserImage = async () => {
  //   if (userState.image === 0) setProfileImg(profile0);
  //   if (userState.image === 1) setProfileImg(profile1);
  //   if (userState.image === 2) setProfileImg(profile2);
  //   if (userState.image === 3) setProfileImg(profile3);
  //   if (userState.image === 4) setProfileImg(profile4);
  //   if (userState.image === 5) setProfileImg(profile5);
  //   if (userState.image === 6) setProfileImg(profile6);
  //   if (userState.image === 7) setProfileImg(profile7);
  //   if (userState.image === 8) setProfileImg(profile8);
  //   if (userState.image === 9) setProfileImg(profile9);
  //   if (userState.image === 10) setProfileImg(profile10);
  //   if (userState.image === 11) setProfileImg(profile11);
  // };

  // useEffect(async () => {
  //   await dispatch(getUser());
  //   await getUserImage();
  // }, [profileImg, userState.image, selectProfileModalState]);

  return (
    <>
      {/* Header*/}
      <div className="header">
        <div className="wrapper">
          {/* Header-Left*/}
          <div className="left">
            <Link to="/">
              <div className="logo">
                <div>
                  <img src={logo} alt="logo"></img>
                </div>
                <span className="name">Podo</span>
              </div>
            </Link>
          </div>

          <div className="middleleft">
            {/* Header-Middle*/}
            <div className="middle">
              <ul>
                <Link to="/create">
                  <li>파티 만들기</li>
                </Link>
                <Link to="/search">
                  <li>파티 찾기</li>
                </Link>
                <Link to="/contents">
                  <li>콘텐츠 찾기</li>
                </Link>
                <Link to="/guide">
                  <li>가이드</li>
                </Link>
              </ul>
            </div>

            {/* Header-Right*/}
            <div className="right">
              {/* <span className="login">로그인</span> */}
              {isLogin ? (
                <Link to="/mypage">
                  <img className="user" src={profileImg} alt="프로필사진" />
                </Link>
              ) : (
                <span
                  className="login"
                  onClick={() => dispatch(showLoginModal(true))}
                >
                  로그인
                </span>
              )}
              {loginModalState ? <LoginModal /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
