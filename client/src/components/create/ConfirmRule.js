import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginCallbackURI } from "../../redux/reducers/loginURISlice";
import { showCardModal, showLoginModal } from "../../redux/reducers/modalSlice";
import { dateToStringPoint } from "../../utils/dateFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineLeft } from "react-icons/ai";

function ConfirmRule(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startDate = useSelector((state) => state.party.ceateParty.start_date);
  const endDate = useSelector((state) => state.party.ceateParty.end_date);
  const period = useSelector((state) => state.party.ceateParty.period);
  const userState = useSelector((state) => state.user);

  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step5"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername">
            파티 규칙을
            <br />
            확인해 보세요.
          </div>
        </div>
        <div className="guidemiddle">
          <div className="rulebox">
            <div className="check">
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                style={{ color: "#4040cc" }}
              />
            </div>
            넷플릭스 프리미엄 로그인 정보를 정확히 확인했습니다.
          </div>
          <div className="rulebox">
            <div className="check">
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                style={{ color: "#4040cc" }}
              />
            </div>
            파티 기간은 {dateToStringPoint(startDate)} ~{" "}
            {dateToStringPoint(endDate)} {period}개월입니다.
          </div>
          <div className="rulebox">
            <div className="check">
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                style={{ color: "#4040cc" }}
              />
            </div>
            성인 인증을 완료했으며, 공유해도 안전한 로그인 정보입니다.
          </div>
          <div className="rulebox">
            <div className="check">
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                style={{ color: "#4040cc" }}
              />
            </div>
            파티장 귀책시, 위약금이 부과될 수 있습니다.
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/create/4"}>
            <div className="backbtn">
              <div className="backicon">
                <AiOutlineLeft />
              </div>{" "}
              뒤로가기
            </div>
          </Link>
          <div
            className="guidefooterbtn"
            onClick={() => {
              if (userState) {
                navigate("/create/6");
              } else {
                dispatch(setLoginCallbackURI("/create/5"));
                dispatch(showLoginModal(true));
              }
            }}
          >
            <div className="nextbtn">다음</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmRule;
