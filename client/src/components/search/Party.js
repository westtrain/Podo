import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";

function Party(props) {
  return (
    <div className="partyexp">
      <div className="partyexpup">
        <div className="peus">
          <span className="peusp">2개월</span>
          파티 지금 시작
        </div>
        <div className="ottfee">
          <div className="won">
            <FontAwesomeIcon
              icon={faWonSign}
              style={{ color: "#c6c6c6" }}
              size="1x"
            />
          </div>
          월 5,575원
        </div>
      </div>
      <div className="partyexpdown">오늘 ~ 2022.01.23 까지</div>
    </div>
  );
}

export default Party;
