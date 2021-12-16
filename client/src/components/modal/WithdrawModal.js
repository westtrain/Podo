import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showWithdrawModal,
  showAccountModal,
} from "../../redux/reducers/modalSlice";
import OutsideClickHandler from "react-outside-click-handler";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
import PodoMoney from "../../image/PodoMoney.svg";

function WithdrawModal(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler
            onOutsideClick={() => dispatch(showWithdrawModal(false))}
          >
            <div className="withdrawalmodalview">
              <div className="exit">
                <div onClick={() => dispatch(showWithdrawModal(false))}>
                  <img src={exit} alt="exit"></img>
                </div>
              </div>
              <div className="wdmheader">인출하기</div>
              <div className="podomoney">Podo 머니 잔액</div>
              <div className="wdmmf">
                <div className="wdmmff">
                  <img src={PodoMoney} alt="podomoney"></img>
                </div>
                <div className="wdmmfs">현재 잔액 {userState.money}원</div>
              </div>
              <div className="withdrawalaccount">인출 계좌</div>
              <div
                className="wdmms"
                onClick={() => {
                  dispatch(showAccountModal(true));
                  dispatch(showWithdrawModal(false));
                }}
              >
                <div className="wdmmff">+ 계좌 등록하기</div>
                <div className="wdmmfs">
                  본인 명의의 계좌만 등록할 수 있어요.
                </div>
              </div>
              <div className="withdrawalguide">인출 신청 안내</div>
              <div className="wdmpay">
                <div className="wdmpayw">
                  - 인출 시 등록하신 계좌로 바로 입금됩니다.
                </div>
                <div className="wdmpayw">
                  - 본인 명의의 계좌가 아닌 경우 인출이 제한됩니다.
                </div>
              </div>

              <div className="clearbtnwrap">
                <button className="clearbtn">
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

export default WithdrawModal;
