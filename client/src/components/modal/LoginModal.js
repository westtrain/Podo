import React from "react";
import { useDispatch } from "react-redux";
import { showLoginModal } from "../../redux/reducers/modalSlice";
import OutsideClickHandler from "react-outside-click-handler";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
import google from "../../image/google.png";
import naver from "../../image/naver.png";
import kakao from "../../image/kakao.png";

function LoginModal(props) {
  const dispatch = useDispatch();

  const onClickGoogle = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };
  const onClickNaver = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/naver`;
  };
  const onClickKakao = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`;
  };

  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler
            onOutsideClick={() => dispatch(showLoginModal(false))}
          >
            <div className="loginmodalview">
              <div className="exit">
                <div onClick={() => dispatch(showLoginModal(false))}>
                  <img src={exit}></img>
                </div>
              </div>
              <div className="lmheader">
                <div>
                  <div className="lmhfirst">환영합니다! Podo를 시작하고</div>
                  <div className="lmhsecond">
                    다양한 서비스를 이용해 보세요.
                  </div>
                </div>
              </div>
              <div className="lmmiddle">
                <button className="socialloginBtn" onClick={onClickGoogle}>
                  <img className="googolelogo" src={google} alt="google"></img>
                  <div>Google로 시작하기</div>
                </button>
                <button className="socialloginBtn" onClick={onClickNaver}>
                  <img className="naverlogo" src={naver} alt="naver"></img>
                  <div>네이버로 시작하기</div>
                </button>
                <button className="socialloginBtn" onClick={onClickKakao}>
                  <img className="kakaolelogo" src={kakao} alt="kakao"></img>
                  <div>카카오로 시작하기</div>
                </button>
              </div>

              <div className="forgotlogin">
                <div className="forgotloginw">로그인 정보를 잊으셨나요?</div>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
