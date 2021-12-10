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
        <div className="selectheader">어떤 파티를 만드시겠어요?</div>
        <div className="selectott">
          <div className="netflixsection">
            <div className="netflix">
              <img src={netflix} alt="netflix"></img>
            </div>
            <div className="netflixexp">
              <h3>NETFLIX</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="watchasection">
            <div className="watcha">
              <img src={watcha} alt="watcha"></img>
            </div>
            <div className="watchaexp">
              <h3>WATCHA</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="wavvesection">
            <div className="wavve">
              <img src={wave} alt="wavve"></img>
            </div>
            <div className="wavveexp">
              <h3>WAVVE</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="tvingsection">
            <div className="tving">
              <img src={tving} alt="tving"></img>
            </div>
            <div className="tvingexp">
              <h3>TVING</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="disneysection">
            <div className="disney">
              <img src={disney} alt="disney"></img>
            </div>
            <div className="disneyexp">
              <h3>DISNEY</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="amazonsection">
            <div className="amazon">
              <img src={amazon} alt="amazon"></img>
            </div>
            <div className="amazonexp">
              <h3>AMAZON</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="laftelsection">
            <div className="laftel">
              <img src={laftel} alt="laftel"></img>
            </div>
            <div className="laftelexp">
              <h3>LAFTEL</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="applesection">
            <div className="apple">
              <img src={apple} alt="apple"></img>
            </div>
            <div className="appleexp">
              <h3>APPLE</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="officesection">
            <div className="office">
              <img src={office} alt="office"></img>
            </div>
            <div className="officeexp">
              <h3>OFFICE</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
          <div className="nintendosection">
            <div className="nintendo">
              <img src={laftel} alt="nintendo"></img>
            </div>
            <div className="nintendoexp">
              <h3>NINTENDO</h3>
              <span>매달 세이브!</span>
              <span>~11,425원</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectOtt;
