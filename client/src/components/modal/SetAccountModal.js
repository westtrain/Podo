import React from "react";
import { useDispatch } from "react-redux";
import { showAccountModal } from "../../redux/reducers/modalSlice";
import OutsideClickHandler from "react-outside-click-handler";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
import right from "../../image/right.png";

function SetAccountModal(props) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler
            onOutsideClick={() => dispatch(showAccountModal(false))}
          >
            <div className="accountmodalview">
              <div className="exit">
                <div>
                  <img
                    src={exit}
                    onClick={() => dispatch(showAccountModal(false))}
                  ></img>
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
                <input className="sammff" placeholder="선택"></input>
              </div>
              <div className="samms">
                <input
                  className="sammff"
                  placeholder="계좌번호(숫자만 입력)"
                ></input>
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

export default SetAccountModal;
