import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOttLoginId, setOttLoginPw } from "../../redux/reducers/partySlice";
import Swal from "sweetalert2";

function OttInfo(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAccord, setIsAccord] = useState(false);
  const ottLoginIdState = useSelector(
    (state) => state.party.ceateParty.ott_login_id
  );
  const ottLoginPwState = useSelector(
    (state) => state.party.ceateParty.ott_login_password
  );

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "id":
        const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (check.test(value)) {
          e.target.value = "";
          e.target.placeholder = "아이디는 영문만 입력 가능합니다.";
        }
        dispatch(setOttLoginId(value));
        break;
      case "pw":
        dispatch(setOttLoginPw(value));
        break;
      case "confirmPw":
        if (value === ottLoginPwState) setIsAccord(true);
        else setIsAccord(false);
        break;
    }
  };
  const onClickNext = () => {
    if (ottLoginIdState === "") {
      Swal.fire("Confirm ID!", "아이디를 입력해주세요.", "error");
    } else if (ottLoginPwState === "") {
      Swal.fire("Confirm Password!", "비밀번호를 입력해주세요.", "error");
    } else if (!isAccord) {
      Swal.fire("Confirm Password!", "비밀번호가 일치하지 않습니다.", "error");
    } else navigate("/create/3");
  };

  useEffect(() => {
    dispatch(setOttLoginId(""));
    dispatch(setOttLoginPw(""));
  }, []);
  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step2"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername">
            넷플릭스 프리미엄의
            <br />
            로그인 정보를 입력해 주세요.
          </div>
        </div>
        <div className="guidemiddle">
          <input
            className="guideinput"
            type="text"
            placeholder="아이디"
            name="id"
            onChange={onChangeInput}
          />
          <input
            className="guideinput"
            type="password"
            placeholder="비밀번호"
            name="pw"
            onChange={onChangeInput}
          />
          {isAccord ? (
            <input
              className="guideinput"
              type="password"
              placeholder="비밀번호 확인"
              name="confirmPw"
              onChange={onChangeInput}
            />
          ) : (
            <input
              className="guideinputred"
              type="password"
              placeholder="비밀번호 확인"
              name="confirmPw"
              onChange={onChangeInput}
            />
          )}
        </div>
        <div className="guidefooter">
          <Link to={"/create/1"}>
            <div className="backbtn">
              <div className="backicon">&#60;</div> 뒤로가기
            </div>
          </Link>

          <div className="guidefooterbtn" onClick={onClickNext}>
            <div className="nextbtn">다음</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OttInfo;
