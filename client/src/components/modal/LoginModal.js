import React from "react";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";

function LoginModal(props) {
  return (
    <>
      <div className="page">
        <div className="modalback">
          <div className="loginmodalview">
            <div className="exit">
              <div>
                <img src={exit}></img>
              </div>
            </div>
            <div className="lmheader">
              <div>
                <div className="lmhfirst">환영합니다! Podo를 시작하고</div>
                <div className="lmhsecond">다양한 서비스를 이용해 보세요.</div>
              </div>
            </div>
            <div className="lmmiddle"></div>

            <div className="forgotlogin">
              <div className="forgotloginw">로그인 정보를 잊으셨나요?</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
