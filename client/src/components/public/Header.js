import React from "react";
import "../../style/App.scss";
import logo from "../../image/Podo_logo.svg";
import pngwing from "../../image/user.png";

function Header(props) {
  return (
    <>
      {/* Header*/}
      <div className="header">
        <div className="wrapper">
          {/* Header-Left*/}
          <div className="left">
            <a className="logo">
              <div>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: 40, height: 40 }}
                ></img>
              </div>

              <span className="name">Podo</span>
            </a>
          </div>

          <div className="middleleft">
            {/* Header-Middle*/}
            <div className="middle">
              <ul>
                <li>파티 만들기</li>
                <li>파티 찾기</li>
                <li>콘텐츠 찾기</li>
                <li>가이드</li>
              </ul>
            </div>

            {/* Header-Right*/}
            <div className="right">
              {/* <span className="login">로그인</span> */}

              <img className="user" src={pngwing} alt="프로필사진" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
