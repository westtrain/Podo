import React from "react";
import { Link } from "react-router-dom";
import "../../style/App.scss";
import logo from "../../image/Podo_logo.svg";
import pngwing from "../../image/user.svg";

function Header(props) {
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
              <Link to="/mypage">
                <img className="user" src={pngwing} alt="프로필사진" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
