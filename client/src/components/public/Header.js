import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOtt } from "../../redux/API/ottAPI";
import { getUser } from "../../redux/API/userAPI";
import { Link } from "react-router-dom";
import { showLoginModal } from "../../redux/reducers/modalSlice";
import LoginModal from "../modal/LoginModal";
import "../../style/App.scss";
import { profileImage } from "../../utils/profileImage";
import logo from "../../image/Podo_logo.svg";

function Header(props) {
  const dispatch = useDispatch();
  const loginModalState = useSelector((state) => state.modal.loginModal);
  const isLogin = useSelector((state) => state.user !== null);
  const userState = useSelector((state) => state.user);

  const [profileImg, setProfileImg] = useState(
    profileImage[userState ? userState.image : 0]
  );

  const selectProfileModalState = useSelector(
    (state) => state.modal.selectProfileImageModal
  );

  useEffect(
    async () => {
      if (isLogin) {
        await dispatch(getUser());
        setProfileImg(profileImage[userState.image]);
      }
    },
    [userState ? userState.image : null],
    selectProfileModalState
  );

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
