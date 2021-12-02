import React from "react";
import PartyCard from "./PartyCard";
import "../../style/MyPage.scss";
import pngwing from "../../image/userCircle.svg";
//import pngwing from "../../image/user.svg";

function MyParty(props) {
  return (
    <div className="middlemain">
      <div className="profile">
        <div className="profilecolor"></div>
        <img src={pngwing} alt="user" className="user"></img>
        <div className="username">말쑥한엔젤</div>
      </div>
      <div className="party">
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
      </div>
    </div>
  );
}

export default MyParty;
