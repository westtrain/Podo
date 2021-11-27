import React from "react";
import "../../style/MyPage.scss";
import pngwing from "../../image/user.png";
import netflix from "../../image/netflix.png";

function MyParty(props) {
  return (
    <div className="middlemain">
      <div className="profile">
        <div className="profilecolor"></div>
        <img src={pngwing} alt="user" className="user"></img>
        <div className="username">말쑥한엔젤</div>
      </div>
      <div className="party">
        <div className="ott">
          <div className="ottbtn">
            <img src={netflix} alt="netflix" className="ottlogo"></img>
          </div>
          <div className="ottname">넷플릭스</div>
          <div className="ottstart">1일 후 시작</div>
          <div className="ottstate" style={{ backgroundColor: "#EBDA42" }}>
            예정
          </div>
        </div>
        <div className="ott">
          <div className="ottbtn">
            <img src={netflix} alt="netflix" className="ottlogo"></img>
          </div>
          <div className="ottname">넷플릭스</div>
          <div className="ottstart">1일 후 시작</div>
          <div className="ottstate" style={{ backgroundColor: "#EBDA42" }}>
            예정
          </div>
        </div>
        <div className="ott">
          <div className="ottbtn">
            <img src={netflix} alt="netflix" className="ottlogo"></img>
          </div>
          <div className="ottname">넷플릭스</div>
          <div className="ottstart">1일 후 시작</div>
          <div className="ottstate" style={{ backgroundColor: "#EBDA42" }}>
            예정
          </div>
        </div>
        <div className="ott">
          <div className="ottbtn">
            <img src={netflix} alt="netflix" className="ottlogo"></img>
          </div>
          <div className="ottname">넷플릭스</div>
          <div className="ottstart">1일 후 시작</div>
          <div className="ottstate" style={{ backgroundColor: "#EBDA42" }}>
            예정
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyParty;
