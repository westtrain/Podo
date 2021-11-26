import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/public/Header";
import MyParty from "../components/mypage/MyParty";
import MyPartyDetail from "../components/mypage/MyPartyDetail";
import MyLogin from "../components/mypage/MyLogin";
import MyPayment from "../components/mypage/MyPayment";
import MyAccount from "../components/mypage/MyAccount";
import MySettlement from "../components/mypage/MySettlement";
import MyStateMent from "../components/mypage/MyStateMent";

function MyPage(props) {
  const { menu } = useParams(); // URL params로 받은 메뉴 이름 예) podo/mypage/mylogin -> menu는 mylogin이 된다!

  return (
    <>
      <Header />
      {/* 여기부터 헤더 아래 */}
      <div>{/* 여기는 마이페이지 Left인 메뉴*/}</div>
      {/* 마이페이지에 들어가면 '나의 파티 관리'가 나오기 때문에 menu===undefined 즉, 주소가 podo/mypage일 때는 MyParty 컴포넌트를 반환한다 */}
      {menu === undefined ? <MyParty /> : null}
      {menu === "login" ? <MyLogin /> : null}
      {menu === "payment" ? <MyPayment /> : null}
      {menu === "account" ? <MyAccount /> : null}
      {menu === "settlement" ? <MySettlement /> : null}
      {menu === "statement" ? <MyStateMent /> : null}
      <div>{/* 마이페이지 Right */}</div>
    </>
  );
}

export default MyPage;
