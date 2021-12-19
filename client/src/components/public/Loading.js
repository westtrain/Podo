import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../style/Modal.scss";
import loading from "../../image/loading.gif";

function WithdrawModal(props) {
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loading);

  return (
    <>
      <div className="page">
        <div className="loadingback">
          <img src={loading} />
        </div>
      </div>
    </>
  );
}

export default WithdrawModal;
