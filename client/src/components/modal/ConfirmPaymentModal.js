import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showConfirmPaymentModal,
  showCardModal,
  showSettlementModal,
} from "../../redux/reducers/modalSlice";
import SetCardModal from "./SetCardModal";
import SetSettlementModal from "./SetSettlementModal";
import { getUsersPaymentInfo } from "../../redux/API/paymentAPI";
import { joinParty } from "../../redux/API/partyAPI";
import Swal from "sweetalert2";
import "../../style/Modal.scss";
import { BsXLg } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";

function ConfirmPaymentModal(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const paymentState = useSelector((state) => state.payment);
  const errorState = useSelector((state) => state.error);
  const cardModalState = useSelector((state) => state.modal.cardModal);
  const settlementModalState = useSelector(
    (state) => state.modal.settlementModal
  );
  const party = props.party;

  const onClickJoin = () => {
    if (!paymentState.card_name || paymentState.settlement_date == "") {
      Swal.fire(
        "Unsuccess!",
        "결제 카드와 정산일을 모두 등록해주세요.",
        "error"
      );
    } else {
      dispatch(
        joinParty({
          partyId: party.id,
        })
      );
      if (errorState === null) {
        Swal.fire("Success!", "파티 가입이 완료되었어요!", "success");
        dispatch(showConfirmPaymentModal(false));
      }
    }
  };
  useEffect(() => {
    if (errorState) {
      Swal.fire("Unsuccess!", "파티 가입을 실패했습니다. ", "error");
    }
  }, [errorState]);

  return (
    <>
      <div className="page">
        <div className="modalback">
          <div className="modalview">
            <div className="exit">
              <div onClick={() => dispatch(showConfirmPaymentModal(false))}>
                <BsXLg />
              </div>
            </div>
            <div className="jpmheader">
              <div>
                <div className="jpmhfirst">파티 가입 전</div>
                <div className="jpmhsecond">
                  결제/정산 정보를 확인해 주세요.
                </div>
              </div>
            </div>
            <div className="jpmmf">
              <div className="jpmmff">
                {" "}
                {paymentState.card_name
                  ? `${paymentState.card_name} ${paymentState.credit_num.slice(
                      0,
                      4
                    )}************`
                  : "결제 카드를 등록해 주세요."}
              </div>
              <div
                className="jpmmfs"
                onClick={() => dispatch(showCardModal(true))}
              >
                {paymentState.card_name ? "변경하기" : "등록하기"}

                <div className="righticon">
                  <AiOutlineRight />
                </div>
              </div>
            </div>
            <div className="jpmms">
              <div className="jpmmff">
                {paymentState.settlement_date
                  ? `${userState.name}님의 정산일 : 매달 ${paymentState.settlement_date}일`
                  : "정산일을 등록해주세요."}
              </div>
              <div
                className="jpmmfs"
                onClick={() => dispatch(showSettlementModal(true))}
              >
                {paymentState.settlement_date ? "변경하기" : "등록하기"}
                <div className="righticon">
                  <AiOutlineRight />
                </div>
              </div>
            </div>

            <div className="jpmpay">
              - 결제 카드는 파티장의 귀책 사유 발생 시 위약금을 부과하기 위해
              필요해요. 약속대로 파티가 잘 진행 된다면 위약금이 발생할 일은 절대
              없으니 안심하세요.
            </div>
            <div className="joinpartysign">
              <button
                className="joinpartysignbtn"
                onClick={() => onClickJoin()}
              >
                <div className="joinpartysignbtnw">파티 가입 완료</div>
              </button>
            </div>
          </div>
        </div>
        {cardModalState ? <SetCardModal /> : null}
        {settlementModalState ? <SetSettlementModal /> : null}
      </div>
    </>
  );
}

export default ConfirmPaymentModal;
