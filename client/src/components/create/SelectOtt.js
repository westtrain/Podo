import React from "react";
import netflix from "../../image/netflix.png";
import watcha from "../../image/watcha.png";
import wave from "../../image/wave.png";
import tving from "../../image/tving.png";
import disney from "../../image/disney.png";
import amazon from "../../image/amazon.png";
import laftel from "../../image/laftel.png";
import apple from "../../image/apple.png";
import office from "../../image/office.png";

function SelectOtt() {
  return (
    <>
      <div className="selectsection">
        <div className="selectheader">어떤 파티를 만드시겟어요?</div>
        <div className="selectott">
          <div className="netflix">
            <img src={netflix} alt="netflix"></img>
          </div>
          <div className="watcha">
            <img src={watcha} alt="watcha"></img>
          </div>
          <div className="wave">
            <img src={wave} alt="wave"></img>
          </div>
          <div className="tving">
            <img src={tving} alt="tving"></img>
          </div>
          <div className="disney">
            <img src={disney} alt="disney"></img>
          </div>
          <div className="amazon">
            <img src={amazon} alt="amazon"></img>
          </div>
          <div className="laftel">
            <img src={laftel} alt="laftel"></img>
          </div>
          <div className="apple">
            <img src={apple} alt="apple"></img>
          </div>
          <div className="office">
            <img src={office} alt="office"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectOtt;
