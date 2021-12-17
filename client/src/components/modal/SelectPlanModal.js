import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOttKoreanNameById, getSavePrice } from "../../utils/dateFunction";
import OutsideClickHandler from "react-outside-click-handler";
import { showSelectPlanModal } from "../../redux/reducers/modalSlice";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
import check_icon from "../../image/check_icon.png";

function SelectPlanModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ottState = useSelector((state) => state.ott);
  const ottId = useSelector((state) => state.party.ceateParty.ott_id);
  const priceOfParty = getSavePrice(
    ottState.filter((p) => p.id === ottId)[0].price,
    4
  );
  const onClickNext = () => {
    dispatch(showSelectPlanModal(false));
    navigate("/create/1");
  };
  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler
            onOutsideClick={() => dispatch(showSelectPlanModal(false))}
          >
            <div className="selectratemodalview">
              <div className="exit">
                <div>
                  <img
                    src={exit}
                    onClick={() => dispatch(showSelectPlanModal(false))}
                  ></img>
                </div>
              </div>
              <div className="srmheader">요금제 확인</div>
              <div className="srmhexp">공유할 요금제를 확인해 주세요.</div>
              <div className="srmmiddle">
                <div className="srmmup">
                  <div className="srmmuimg">
                    <img src={check_icon} alt="check"></img>
                  </div>
                  <div className="srmmuexp">{getOttKoreanNameById(ottId)}</div>
                </div>
                <div className="srmmdown">
                  <div>&middot; 파티원은 최대 3명 모집할 수 있어요</div>
                  <div>
                    &middot; 최대 인원 모집 시 매달 {priceOfParty}원 세이브!
                  </div>
                </div>
              </div>

              <div className="clearbtnwrap">
                <button className="clearbtn" onClick={onClickNext}>
                  <div className="clearbtnw">다음</div>
                </button>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
}

export default SelectPlanModal;
