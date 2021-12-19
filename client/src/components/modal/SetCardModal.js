import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showCardModal } from "../../redux/reducers/modalSlice";
import { updateCard } from "../../redux/API/paymentAPI";
import { autoHypen, onlyNumber } from "../../utils/dateFunction";
import OutsideClickHandler from "react-outside-click-handler";
import Swal from "sweetalert2";
import "../../style/Modal.scss";
import { BsXLg } from "react-icons/bs";

function SetCardModal(props) {
  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.payment);
  const errorState = useSelector((state) => state.error);
  const [creditNumber, setCreditNumnber] = useState("");
  const [expireMM, setExpireMM] = useState("");
  const [expireYY, setExpireYY] = useState("");
  const [birth, setBirth] = useState("");
  const [creditPassword, setCreditPassword] = useState("");
  const [warning, setWarning] = useState("");

  const onClickSubmit = async () => {
    if (
      creditNumber === "" ||
      expireMM === "" ||
      expireYY === "" ||
      birth === "" ||
      creditPassword === ""
    ) {
      setWarning("카드 정보를 모두 입력해주세요.");
    } else {
      let creditInfo = {
        credit_num: creditNumber,
        credit_expire_month: expireMM,
        credit_expire_year: expireYY,
        credit_birth: birth,
        credit_password: creditPassword,
        settlement_date: null,
        account_bank: null,
        account_number: null,
      };
      creditInfo = Object.assign({}, paymentState, creditInfo);
      await dispatch(updateCard({ state: creditInfo }));
      if (errorState) {
        if (errorState.status === 422)
          setWarning("유효하지 않은 카드 정보입니다.");
        else {
          Swal.fire(
            "Unsuccess!",
            "결제 카드 등록에 실패했습니다. 다시 시도해주세요.🥺",
            "success"
          );
        }
      } else {
        setWarning("");
        Swal.fire(
          "Success!",
          "결제 카드가 정상적으로 등록되었습니다.",
          "success"
        );
      }
    }
  };
  useEffect(() => {}, [errorState]);
  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler
            onOutsideClick={() => dispatch(showCardModal(false))}
          >
            <div className="setcardmodalview">
              <div className="exit">
                <div>
                  <BsXLg onClick={() => dispatch(showCardModal(false))} />
                </div>
              </div>
              <div className="scmheader">결제 카드를 등록해 주세요.</div>

              <div className="scmhf">
                Podo는 고객님의 결제 정보를 직접 저장하지 않고, 결제 보안 솔루션
                <br></br>
                아임포트를 통해 안전하게 관리하고 있으며, 본인 명의의 카드만
                등록할 수<br></br> 있습니다.
              </div>

              <div className="sdmmf">
                <div>카드 번호 (16자리)</div>
                <input
                  value={creditNumber}
                  onChange={(e) => {
                    setCreditNumnber(autoHypen(onlyNumber(e.target.value)));
                  }}
                />
              </div>

              <div className="sdmms">
                <div className="sdmmsf">
                  <div>유효기간(MM)</div>
                  <input
                    value={expireMM}
                    maxLength="2"
                    onChange={(e) => {
                      setExpireMM(onlyNumber(e.target.value));
                    }}
                  />
                </div>
                <div className="sdmmss">
                  <div>유효기간(YY)</div>
                  <input
                    value={expireYY}
                    maxLength="2"
                    onChange={(e) => {
                      setExpireYY(onlyNumber(e.target.value));
                    }}
                  />
                </div>
              </div>

              <div className="sdmms">
                <div className="sdmmsf">
                  <div>생년월일(6자리)</div>
                  <input
                    value={birth}
                    maxLength="6"
                    onChange={(e) => {
                      setBirth(onlyNumber(e.target.value));
                    }}
                  />
                </div>
                <div className="sdmmss">
                  <div>비밀번호(앞2자)</div>
                  <input
                    value={creditPassword}
                    maxLength="2"
                    onChange={(e) => {
                      setCreditPassword(onlyNumber(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div className="warning">{warning}</div>

              <div className="clearbtnwrap">
                <button className="clearbtn" onClick={onClickSubmit}>
                  <div className="clearbtnw">완료</div>
                </button>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
}

export default SetCardModal;
