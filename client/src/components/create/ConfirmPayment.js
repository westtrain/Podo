import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardModal,
  showSettlementModal,
} from "../../redux/reducers/modalSlice";
import { getUsersPaymentInfo } from "../../redux/API/paymentAPI";
import { createParty } from "../../redux/API/partyAPI";
import { getUser } from "../../redux/API/userAPI";
import SetCardModal from "../modal/SetCardModal";
import SetSettlementModal from "../modal/SetSettlementModal";
import Swal from "sweetalert2";

function ConfirmPayment(props) {
  const dispatch = useDispatch();
  const cardModalState = useSelector((state) => state.modal.cardModal);
  const settlementModalState = useSelector(
    (state) => state.modal.settlementModal
  );
  const paymentState = useSelector((state) => state.payment);
  const createPartyState = useSelector((state) => state.party.ceateParty);
  const userState = useSelector((state) => state.user);
  const errorState = useSelector((state) => state.error);

  const onClickCreate = () => {
    console.log("???");
    if (!paymentState.card_name || paymentState.settlement_date == "") {
      Swal.fire(
        "Unsuccess!",
        "결제 카드와 정산일을 모두 등록해주세요.",
        "error"
      );
    } else if (
      createPartyState.ott_id === 0 ||
      createPartyState.ott_login_id === "" ||
      createPartyState.ott_login_id === "" ||
      (createPartyState.start_date === "") | (createPartyState.end_date === "")
    ) {
      Swal.fire(
        "Unsuccess!",
        `파티 정보가 누락되었습니다.
        파티 만들기를 다시 진행하세요.`,
        "error"
      );
    } else {
      dispatch(
        createParty({
          createPartyState: createPartyState,
        })
      );
      if (errorState === null) {
        Swal.fire("Success!", "파티가 만들어졌어요!", "success");
      }
    }
  };
  useEffect(() => {
    dispatch(getUsersPaymentInfo());
    dispatch(getUser());
    if (errorState) {
      Swal.fire(
        "Unsuccess!",
        "이미 사용 중인 OTT의 파티는 생성이 불가해요! ",
        "error"
      );
    }
  }, [errorState]);
  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step6"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername">
            마지막 단계예요.
            <br />
            결제/정산 정보를 확인하세요.
          </div>
        </div>
        <div className="guidemiddle">
          <div className="paymentbox">
            {paymentState.card_name
              ? `${paymentState.card_name} ${paymentState.credit_num.slice(
                  0,
                  4
                )}************`
              : "결제 카드를 등록해 주세요."}
            <div
              className="paymentright"
              onClick={() => dispatch(showCardModal(true))}
            >
              {paymentState.card_name ? "변경하기" : "등록하기"}
              <div className="arrow"> &#62;</div>
            </div>
          </div>
          {cardModalState ? <SetCardModal /> : null}
          <div className="paymentbox">
            {paymentState.settlement_date
              ? `${userState.name}님의 정산일 : 매달 ${paymentState.settlement_date}일`
              : "정산일을 등록해주세요."}

            <div
              className="paymentright"
              onClick={() => dispatch(showSettlementModal(true))}
            >
              변경하기
              <div className="arrow"> &#62;</div>
            </div>
            {settlementModalState ? <SetSettlementModal /> : null}
          </div>
          <div className="infoperiod">
            - 결제 카드는 파티장의 귀책 사유 발생 시 위약금을 부과하기 위해
            필요해요. 파티가 잘 진행된다면 위약금이 발생할 일은 절대 없으니
            안심하세요.
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/create/5"}>
            <div className="backbtn">
              <div className="backicon">&#60;</div> 뒤로가기
            </div>
          </Link>
          <div className="guidefooterbtn" onClick={() => onClickCreate()}>
            <div className="nextbtn">파티 생성</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmPayment;
