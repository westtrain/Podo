import React from "react";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
import right from "../../image/right.png";

function JoinPartyModal(props) {
  return (
    <>
      <div className="page">
        <div className="modalback">
          <div className="modalview">
            <div className="exit">
              <div>
                <img src={exit}></img>
              </div>
            </div>
            <div className="jpmheader">
              <div>
                <div className="jpmhfirst">파티 가입 전</div>
                <div className="jpmhsecond">
                  결제/정산 정보를 확인해 주세요.
                </div>
              </div>
            </div>
            <div className="jpmmf">
              <div className="jpmmff">국민KB카드 ****8888</div>
              <div className="jpmmfs">
                변경하기<img src={right} className="righticon"></img>
              </div>
            </div>
            <div className="jpmms">
              <div className="jpmmff">
                활홀한 보살님의 포도 정산일 : 매달 3일
              </div>
              <div className="jpmmfs">
                변경하기<img src={right}></img>
              </div>
            </div>

            <div className="jpmpay">
              - 결제 카드는 파티장의 귀책 사유 발생 시 위약금을 부과하기 위해
              필요해요. 약속대로 파티가 잘 진행 된다면 위약금이 발생할 일은 절대
              없으니 안심하세요.
            </div>
            <div className="joinpartysign">
              <button className="joinpartysignbtn">
                <div className="joinpartysignbtnw">파티 가입 완료</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinPartyModal;
