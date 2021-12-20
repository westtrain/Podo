import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../redux/API/paymentAPI";
import { showAccountModal } from "../../redux/reducers/modalSlice";
import { onlyNumber, bankList, bankImage } from "../../utils/dateFunction";
import OutsideClickHandler from "react-outside-click-handler";
import "../../style/Modal.scss";
import Swal from "sweetalert2";
import { BsXLg } from "react-icons/bs";

function SetAccountModal(props) {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectBank, setSelectBank] = useState("선택");
  const [bankCode, setBankCode] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [warning, setWarning] = useState("");
  const paymentState = useSelector((state) => state.payment);
  const errorState = useSelector((state) => state.error);

  const onChangeAccountNum = (e) => {
    setAccountNum(onlyNumber(e.target.value));
  };

  const onClickSubmit = () => {
    if (bankCode === "" || accountNum === "") {
      Swal.fire("Input!", "계좌 정보를 모두 입력해주세요.", "error");
    } else {
      let paymentInfo = {
        account_bank: bankCode,
        account_number: accountNum,
      };
      paymentInfo = Object.assign({}, paymentState, paymentInfo);
      dispatch(
        updateAccount({
          state: paymentInfo,
        })
      );
      if (errorState) {
        Swal.fire(
          "Input!",
          "유효한 계좌정보가 아닙니다. 다시 입력해주세요!",
          "error"
        );
      }
      Swal.fire("Success!", "계좌 정보가 등록되었습니다.", "success");
    }
  };

  const bankElements = () => {
    const result = [];
    Object.keys(bankList, bankImage).map((bankCode, i) => {
      result.push(
        <div
          onClick={() => {
            setShowDropdown(!showDropdown);
            setSelectBank(bankList[bankCode]);
            setBankCode(bankCode);
          }}
        >
          <img src={bankImage[bankCode]} alt="bank"></img>
          <div key={i} className="bank">
            {bankList[bankCode]}
          </div>
        </div>
      );
    });
    return result;
  };

  return (
    <>
      <div className="page">
        <div className="modalback">
          <div className="accountmodalview">
            <div className="exit">
              <div>
                <BsXLg onClick={() => dispatch(showAccountModal(false))} />
              </div>
            </div>
            <div className="samheader">
              <div>
                <div className="samhfirst">인출 계좌를 등록해 주세요.</div>
                <div className="samhsecond">
                  본인 명의의 계좌만 등록할 수 있어요.
                </div>
              </div>
            </div>
            <div className="selectbank">은행 선택</div>
            <div className="sammf">
              {/* <input className="sammff" placeholder="선택"></input> */}
              <div
                className="sammff"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {selectBank}
              </div>
              {showDropdown ? (
                <div className="choosebank">{bankElements()}</div>
              ) : null}
            </div>
            <div className="samms">
              <input
                className="sammff"
                placeholder="계좌번호(숫자만 입력)"
                value={accountNum}
                onChange={onChangeAccountNum}
              ></input>
            </div>
            <div className="clearbtnwrap">
              <button className="clearbtn" onClick={() => onClickSubmit()}>
                <div className="clearbtnw">완료</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetAccountModal;
