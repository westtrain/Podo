import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOtt } from "../../redux/API/ottAPI";
import { getOttKoreanNameById, getSavePrice } from "../../utils/dateFunction";
import OutsideClickHandler from "react-outside-click-handler";
import { showSelectPlanModal } from "../../redux/reducers/modalSlice";
import "../../style/Modal.scss";
import { BsXLg, BsDot } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

function SelectPlanModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ottState = useSelector((state) => state.ott);
  const ottId = useSelector((state) => state.party.ceateParty.ott_id);
  const maxNumOfParty = ottState[ottId - 1].max_num;
  const priceOfParty = getSavePrice(ottState[ottId - 1].price, maxNumOfParty);
  const planOfParty = ottState[ottId - 1].plan;
  const onClickNext = () => {
    dispatch(showSelectPlanModal(false));
    navigate("/create/1");
  };
  useEffect(() => {
    dispatch(getAllOtt);
  }, []);
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
                  <BsXLg onClick={() => dispatch(showSelectPlanModal(false))} />
                </div>
              </div>
              <div className="srmheader">요금제 확인</div>
              <div className="srmhexp">공유할 요금제를 확인해 주세요.</div>
              <div className="srmmiddle">
                <div className="srmmup">
                  <div className="srmmuimg">
                    <AiOutlineCheck style={{ color: "#4040cc" }} size="20px" />
                  </div>
                  <div className="srmmuexp">
                    {getOttKoreanNameById(ottId) + " " + planOfParty}
                  </div>
                </div>
                <div className="srmmdown">
                  <div>
                    <BsDot /> 파티원은 최대 {maxNumOfParty}명 모집할 수 있어요
                  </div>
                  <div>
                    <BsDot /> 최대 인원 모집 시 매달 {priceOfParty}원 세이브!
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
