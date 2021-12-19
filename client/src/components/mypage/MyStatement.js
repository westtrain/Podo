import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentPointWithdrawal } from "../../redux/API/statementAPI";

function MyStatement(props) {
  const dispatch = useDispatch();
  const statementState = useSelector((state) => state.statement);

  const getStatementType = (type) => {
    if (type === "payment") return "카드 결제";
    if (type === "point") return "포도머니 적립";
    if (type === "withdrawal") return "포도머니 인출";
  };

  const getStatementRender = () => {
    const result = [];
    statementState.map((statement, i) => {
      result.push(
        <div className="statement" key={i}>
          {statement.createdAt}
          <div className="bottombox">
            <div className="paymenttype">
              {statement.ott} 파티 ➡ {getStatementType(statement.type)}
            </div>
            <div className="amount">{statement.amount}원</div>
          </div>
        </div>
      );
    });
    return result;
  };
  useEffect(async () => {
    dispatch(getPaymentPointWithdrawal());
  }, []);

  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">결제/적립/인출 관리</div>
            <div className="statementbox">
              {statementState.length === 0
                ? "결제/적립/인출 내역이 없습니다."
                : getStatementRender()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyStatement;
