import React from "react";
import { useDispatch } from "react-redux";
import { showCardModal } from "../../redux/reducers/modalSlice";
import OutsideClickHandler from "react-outside-click-handler";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";

function SetCardModal(props) {
  const dispatch = useDispatch();
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
                  <img
                    src={exit}
                    onClick={() => dispatch(showCardModal(false))}
                  ></img>
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
                <input></input>
              </div>

              <div className="sdmms">
                <div className="sdmmsf">
                  <div>유효기간(MM)</div>
                  <input></input>
                </div>
                <div className="sdmmss">
                  <div>유효기간(YY)</div>
                  <input></input>
                </div>
              </div>

              <div className="sdmms">
                <div className="sdmmsf">
                  <div>생년월일(6자리)</div>
                  <input></input>
                </div>
                <div className="sdmmss">
                  <div>비밀번호(앞2자)</div>
                  <input></input>
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

export default SetCardModal;
