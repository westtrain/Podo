import React from "react";
import netflix from "../../image/netflix.png";

function PartyCard(props) {
  return (
    <>
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
    </>
  );
}

export default PartyCard;
