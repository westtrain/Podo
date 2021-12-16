import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentPointWithdrawal } from "../../redux/API/statementAPI";
import { getUser } from "../../redux/API/userAPI";
import { setPaymentPointWithdrawal } from "../../redux/reducers/statementSlice";

function MyStatement(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const statementState = useSelector((state) => state.statement);

  useEffect(async () => {
    await dispatch(getPaymentPointWithdrawal());
    console.log(statementState);
  }, []);

  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">결제/적립/인출 관리</div>
            <div className="statementbox">
              {statementState.map((statement, i) => (
                <div className="statement" key={i}>
                  {statement.createdAt}
                  <div className="bottombox">
                    <div className="paymenttype">
                      {statement.ott} 파티 카드 결제
                    </div>
                    <div className="amount">{statement.amount}원</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyStatement;
