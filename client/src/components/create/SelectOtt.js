import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ottList } from "../../utils/dateFunction";
import { setOttId } from "../../redux/reducers/partySlice";
import { showSelectPlanModal } from "../../redux/reducers/modalSlice";
import SelectPlanModal from "../modal/SelectPlanModal";
import netflix from "../../image/netflix.png";
import watcha from "../../image/watcha.png";
import wavve from "../../image/wavve.png";
import tving from "../../image/tving.png";
import disney from "../../image/disney.png";
import amazon from "../../image/amazon.png";
import laftel from "../../image/laftel.png";
import apple from "../../image/apple.png";
import office from "../../image/office.png";
import nintendo from "../../image/nintendo.png";

function SelectOtt() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const planModalState = useSelector((state) => state.modal.selectPlanModal);
  const onClickOtt = (ottName) => {
    const ottId = ottList[ottName];
    dispatch(setOttId(ottId));
    //navigate("/create/1");
    dispatch(showSelectPlanModal(true));
  };

  useEffect(() => {
    dispatch(setOttId(0));
  }, []);

  return (
    <>
      <div className="selectsection">
        <div className="selectheader">어떤 파티를 만드시겠어요?</div>
        {planModalState ? <SelectPlanModal /> : null}
        <div className="selectott">
          <div className="netflixsection" onClick={() => onClickOtt("netflix")}>
            <div className="netflix">
              <img src={netflix} alt="netflix"></img>
            </div>
            <div className="netflixexp">
              <h3>넷플릭스</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div className="watchasection" onClick={() => onClickOtt("watcha")}>
            <div className="watcha">
              <img src={watcha} alt="watcha"></img>
            </div>
            <div className="watchaexp">
              <h3>왓챠</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div className="wavvesection" onClick={() => onClickOtt("wavve")}>
            <div className="wavve">
              <img src={wavve} alt="wavve"></img>
            </div>
            <div className="wavveexp">
              <h3>웨이브</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div className="applesection" onClick={() => onClickOtt("apple")}>
            <div className="apple">
              <img src={apple} alt="apple"></img>
            </div>
            <div className="appleexp">
              <h3>애플</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div
            className="nintendosection"
            onClick={() => onClickOtt("nintendo")}
          >
            <div className="nintendo">
              <img src={nintendo} alt="nintendo"></img>
            </div>
            <div className="nintendoexp">
              <h3>닌텐도</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div className="tvingsection" onClick={() => onClickOtt("tving")}>
            <div className="tving">
              <img src={tving} alt="tving"></img>
            </div>
            <div className="tvingexp">
              <h3>티빙</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div className="disneysection" onClick={() => onClickOtt("disney")}>
            <div className="disney">
              <img src={disney} alt="disney"></img>
            </div>
            <div className="disneyexp">
              <h3>디즈니 플러스</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div className="laftelsection" onClick={() => onClickOtt("laftel")}>
            <div className="laftel">
              <img src={laftel} alt="laftel"></img>
            </div>
            <div className="laftelexp">
              <h3>라프텔</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div className="officesection" onClick={() => onClickOtt("office")}>
            <div className="office">
              <img src={office} alt="office"></img>
            </div>
            <div className="officeexp">
              <h3>오피스 365</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
          <div className="amazonsection" onClick={() => onClickOtt("prime")}>
            <div className="amazon">
              <img src={amazon} alt="amazon"></img>
            </div>
            <div className="amazonexp">
              <h3>프라임 비디오</h3>
              <span>매달 세이브!~11,425원</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectOtt;
