import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateToStringPoint, getMonthString } from "../../utils/dateFunction";

import {
  showJoinPartyModal,
  showConfirmPaymentModal,
  showLoginModal,
} from "../../redux/reducers/modalSlice";
import OutsideClickHandler from "react-outside-click-handler";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";

function JoinPartyModal(props) {
  const dispatch = useDispatch();
  const party = props.party;
  const ottName = useSelector((state) => state.ott)[party.ott_id - 1].name;
  const userState = useSelector((state) => state.user);

  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler
            onOutsideClick={() => dispatch(showJoinPartyModal(false))}
          >
            <div className="modalview">
              <div className="exit">
                <div onClick={() => dispatch(showJoinPartyModal(false))}>
                  <img src={exit}></img>
                </div>
              </div>
              <div className="cpmheader">
                <div>
                  <div className="cpmhfirst">
                    <div className="cpmhff">지금 파티 가입하고</div>
                    <div className="cpmhfs">
                      {getMonthString(party.start_date)}월부터
                    </div>
                  </div>
                  <div className="cpmhsecond">
                    {ottName} 서비스를 이용해 보세요.
                  </div>
                </div>
              </div>
              <div className="cpmmf">
                <div className="cpmmff">이용 서비스</div>
                <div className="cpmmfs">{ottName}</div>
              </div>
              <div className="cpmms">
                <div className="cpmmff">파티 기간</div>
                <div className="cpmmfs">
                  {dateToStringPoint(party.start_date)} ~{" "}
                  {dateToStringPoint(party.end_date)}
                </div>
              </div>
              <div className="cpmpay">파티 요금 정보</div>
              <div className="cpmpayf">
                <div className="cpmpayfh">
                  <div className="cpmpayfhf">파티 요금 결제</div>
                  <div className="cpmpayfhs">(월, VAT포함)</div>
                </div>
                <div className="cpmpayff">{props.priceOfParty}원</div>
              </div>

              <button
                className="partysignbtn"
                onClick={() => {
                  if (userState === null) {
                    // isLogin === false
                    dispatch(showLoginModal(true));
                  }
                  dispatch(showJoinPartyModal(false));
                  dispatch(showConfirmPaymentModal(true));
                }}
              >
                <div className="partysignbtnw">파티 가입하기</div>
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
}

export default JoinPartyModal;
