import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDday, getOttKoreanNameById } from "../../utils/dateFunction";
import { AiFillCrown } from "react-icons/ai";
import netflix from "../../image/netflix.png";
import watcha from "../../image/watcha.png";
import wavve from "../../image/wavve.png";
import tving from "../../image/tving.png";
import disney from "../../image/disney.png";
import amazon from "../../image/amazon.png";
import laftel from "../../image/laftel.png";
import apple from "../../image/apple.png";
import office from "../../image/office.png";
import nintendo from "../../image/nintendo.png";

function PartyCard(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const party = props.party;
  const ottName = getOttKoreanNameById(party.ott_id);
  const d_day = getDday(party.start_date);
  const d_dayOfEndDate = getDday(party.end_date);
  const ottLogoList = [
    netflix,
    watcha,
    wavve,
    tving,
    disney,
    amazon,
    laftel,
    apple,
    office,
    nintendo,
  ];

  return (
    <>
      <div className="ott">
        <div className="crown">
          {party.leader === userState.id ? (
            <AiFillCrown style={{ color: "#FFD159" }} size="22px" />
          ) : null}
        </div>
        <div className="ottbtn">
          <img
            src={ottLogoList[party.ott_id - 1]}
            alt="ottlogo"
            className="ottlogo"
          />
        </div>
        <div className="ottname">{ottName}</div>
        {d_day > 0 ? (
          <>
            {" "}
            <div className="ottstart">{d_day}일 후 시작</div>
            <div className="ottstate" style={{ backgroundColor: "#F0E04A" }}>
              예정
            </div>
          </>
        ) : d_day > -7 ? (
          <>
            {" "}
            <div className="ottstart">D {d_dayOfEndDate}</div>
            <div className="ottstate" style={{ backgroundColor: "#FF687A" }}>
              사용중
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="ottstart">D {d_dayOfEndDate}</div>
            <div className="ottstate" style={{ backgroundColor: "#66E197" }}>
              사용중
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PartyCard;
