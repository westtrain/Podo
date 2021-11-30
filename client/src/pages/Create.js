import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/public/Header";
import LeaderGuide from "../components/create/LeaderGuide";
import OttInfo from "../components/create/OttInfo";
import NumOfMembers from "../components/create/NumOfMembers";
import Period from "../components/create/Period";
import ConfirmRule from "../components/create/ConfirmRule";
import ConfirmPayment from "../components/create/ConfirmPayment";
import "../style/Create.scss";

function Create(props) {
  const { step } = useParams(); // URL params로 받은 파티 만들기 스텝
  console.log(step);
  return (
    <>
      <Header />
      {/* 여기부터 헤더 아래 */}
      <div className="create">
        <div className="createbody">
          {step === undefined ? <LeaderGuide /> : null}
          {step === "1" ? <LeaderGuide /> : null}
          {step === "2" ? <OttInfo /> : null}
          {step === "3" ? <NumOfMembers /> : null}
          {step === "4" ? <Period /> : null}
          {step === "5" ? <ConfirmRule /> : null}
          {step === "6" ? <ConfirmPayment /> : null}
        </div>
      </div>
    </>
  );
}

export default Create;
