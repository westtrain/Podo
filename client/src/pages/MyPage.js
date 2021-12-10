import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/public/Header";
import MyParty from "../components/mypage/MyParty";
import MyPartyDetail from "../components/mypage/MyPartyDetail";
import MyLogin from "../components/mypage/MyLogin";
import MyPayment from "../components/mypage/MyPayment";
import MyAccount from "../components/mypage/MyAccount";
import MySettlement from "../components/mypage/MySettlement";
import MyStateMent from "../components/mypage/MyStateMent";
import "../style/MyPage.scss";
import PodoMoney from "../image/PodoMoney.svg";

function MyPage(props) {
  const userState = useSelector((state) => state.user);
  const { menu } = useParams(); // URL params로 받은 메뉴 이름 예) podo/mypage/mylogin -> menu는 mylogin이 된다!
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <Header />
      <div className="mypage">
        {/* 여기부터 헤더 아래 */}
        <div className="body">
          <div className="main">
            <div className="mobilemenu">
              <div className="mobilemypage" onClick={handleMenu}>
                마이페이지
              </div>
            </div>
            {showMenu ? (
              <div className="mobilemenulist">
                <div className="up">
                  <p>Podo 관리</p>
                  <Link to="/mypage/">
                    <div onClick={handleMenu}>나의 파티 관리</div>
                  </Link>
                  <Link to="/mypage/login">
                    <div onClick={handleMenu}>로그인 관리</div>
                  </Link>
                </div>
                <div className="down">
                  <p>결제/정산 관리</p>
                  <Link to="/mypage/payment">
                    <div onClick={handleMenu}>결제 수단 관리</div>
                  </Link>
                  <Link to="/mypage/account">
                    <div onClick={handleMenu}>인출 계좌 관리</div>
                  </Link>
                  <Link to="/mypage/settlement">
                    <div onClick={handleMenu}>Podo 정산일 관리</div>
                  </Link>
                  <Link to="/mypage/statement">
                    <div onClick={handleMenu}>결제/적립/인출 내역</div>
                  </Link>
                </div>
              </div>
            ) : null}

            <div className="left">
              <div className="menu">
                <div className="up">
                  <p>Podo 관리</p>
                  <Link to="/mypage/">
                    <div>나의 파티 관리</div>
                  </Link>
                  <Link to="/mypage/login">
                    <div>로그인 관리</div>
                  </Link>
                </div>
                <div className="down">
                  <p>결제/정산 관리</p>
                  <Link to="/mypage/payment">
                    <div>결제 수단 관리</div>
                  </Link>
                  <Link to="/mypage/account">
                    <div>인출 계좌 관리</div>
                  </Link>
                  <Link to="/mypage/settlement">
                    <div>Podo 정산일 관리</div>
                  </Link>
                  <Link to="/mypage/statement">
                    <div>결제/적립/인출 내역</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="middle">
              {/* 마이페이지에 들어가면 '나의 파티 관리'가 나오기 때문에 menu===undefined 즉, 주소가 podo/mypage일 때는 MyParty 컴포넌트를 반환한다 */}
              {menu === undefined ? <MyParty /> : null}
              {menu === "party" ? <MyPartyDetail /> : null}
              {menu === "login" ? <MyLogin /> : null}
              {menu === "payment" ? <MyPayment /> : null}
              {menu === "account" ? <MyAccount /> : null}
              {menu === "settlement" ? <MySettlement /> : null}
              {menu === "statement" ? <MyStateMent /> : null}
            </div>
            <div className="right">
              <div className="up">
                나의 Podo머니
                <div className="money">
                  <img src={PodoMoney} alt="Podo" />
                  0원
                </div>
                <div className="withdrawal">인출하기</div>
              </div>
              <div className="down">Podo 정산일 미리보기</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
