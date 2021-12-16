import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOtt } from "../../redux/API/ottAPI";
import { dateToStringPoint, refinePrice } from "../../utils/dateFunction";
import { showJoinPartyModal } from "../../redux/reducers/modalSlice";
import JoinPartyModal from "../modal/JoinPartyModal";
import ConfirmPaymentModal from "../modal/ConfirmPaymentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";

function Party(props) {
  const dispatch = useDispatch();
  const ottState = useSelector((state) => state.ott);
  const joinPartyModalState = useSelector(
    (state) => state.modal.joinPartyModal
  );
  const confirmPaymentModalState = useSelector(
    (state) => state.modal.confirmPaymentModal
  );
  const party = props.party;

  const priceOfParty = refinePrice(
    ottState.filter((p) => p.id === party.ott_id)[0].price / party.members_num
  );
  useEffect(() => {
    dispatch(getAllOtt());
  }, []);
  return (
    <>
      <div
        className="partyexp"
        onClick={() => dispatch(showJoinPartyModal(true))}
      >
        <div className="partyexpup">
          <div className="peus">
            <span className="peusp">{party.period}개월</span>
            {party.members_num}인 파티 지금 시작
          </div>
          <div className="ottfee">
            <div className="won">
              <FontAwesomeIcon
                icon={faWonSign}
                style={{ color: "#c6c6c6" }}
                size="1x"
              />
            </div>
            월 {priceOfParty}원
          </div>
        </div>

        <div className="partyexpdown">
          {dateToStringPoint(party.start_date)} ~{" "}
          {dateToStringPoint(party.end_date)} 까지
        </div>
      </div>

      {joinPartyModalState ? (
        <JoinPartyModal party={party} priceOfParty={priceOfParty} />
      ) : null}
      {confirmPaymentModalState ? (
        <ConfirmPaymentModal party={party} priceOfParty={priceOfParty} />
      ) : null}
    </>
  );
}

export default Party;
