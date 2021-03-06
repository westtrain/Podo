import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPeriodForFilter,
  setMembersNumForFilter,
} from "../redux/reducers/partySlice";
import { getAllParties, getFilteredParties } from "../redux/API/partyAPI";
import { dateToStringDash, getOttKoreanNameById } from "../utils/dateFunction";
import Header from "../components/public/Header";
import Party from "../components/search/Party";
import Warning from "../components/search/Warning";
import Calendar from "../components/search/Calendar";
import Loading from "../components/public/Loading";
import JoinPartyModal from "../components/modal/JoinPartyModal";
import ConfirmPaymentModal from "../components/modal/ConfirmPaymentModal";
import "../style/Search.scss";
import "../style/datepicker.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowDropdown } from "react-icons/io";
import netflix from "../image/NetflixName.png";
import watcha from "../image/WatchaName.png";
import wavve from "../image/WavveName.svg";
import tving from "../image/TvingName.svg";
import disney from "../image/DisneyName.svg";
import prime from "../image/PrimeName.svg";
import laftel from "../image/LaftelName.svg";
import apple from "../image/AppleName.svg";
import office from "../image/Office365Name.png";
import nintendo from "../image/NintendoName.png";
import { getAllOtt } from "../redux/API/ottAPI";

function Search(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOtt, setSelectedOtt] = useState(netflix);
  const [selectedParty, setSelectedParty] = useState(null);
  const [ottId, setOttId] = useState(1);
  const [startDate, setStartDate] = useState(
    dateToStringDash(new Date().setDate(new Date().getDate() + 1))
  );
  const dispatch = useDispatch();
  const partiesState = useSelector(
    (state) => state.party.parties.filteredParty
  );
  const periodState = useSelector((state) => state.party.parties.period);
  const membersNumState = useSelector(
    (state) => state.party.parties.members_num
  );
  const loadingState = useSelector((state) => state.loading);
  const joinPartyModalState = useSelector(
    (state) => state.modal.joinPartyModal
  );
  const confirmPaymentModalState = useSelector(
    (state) => state.modal.confirmPaymentModal
  );
  const ottLogoList = [
    netflix,
    watcha,
    wavve,
    tving,
    disney,
    prime,
    laftel,
    apple,
    office,
    nintendo,
  ];

  const getOttRenderList = () => {
    const result = [];
    ottLogoList.map((ott, i) => {
      result.push(
        <li key={i}>
          <img
            src={ott}
            alt="ott"
            height="30px"
            onClick={() => {
              setOttId(i + 1);
              setSelectedOtt(ott);
            }}
          />
        </li>
      );
    });
    return result;
  };
  const getParty = () => {
    if (periodState || membersNumState) {
      // ?????? ?????? ?????? ????????? ???????????????
      dispatch(
        getFilteredParties({
          id: ottId,
          date: startDate,
          period: periodState,
          members_num: membersNumState,
        })
      );
    } else {
      dispatch(getFilteredParties({ id: ottId, date: startDate }));
    }
  };

  useEffect(() => {
    getParty();
  }, [periodState, selectedOtt, membersNumState, startDate]);
  return (
    <>
      <Header />
      <div className="search">
        <div className="searchbody">
          <div className="searchleft">
            <div className="wrapper">
              <div
                className="selectott"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img src={selectedOtt} alt="ottname" className="ottname"></img>
                <IoIosArrowDropdown size="25px" />
              </div>
            </div>

            {showDropdown ? (
              <div
                className="modalback"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div
                  className="filterWindow dropdown"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <ul>{getOttRenderList()}</ul>
                </div>
              </div>
            ) : null}
            <div className="calendar">
              <Calendar setStartDate={setStartDate} />
            </div>
            <div className="searchleftdown">
              <Link to="/guide">
                <div className="guidesee">
                  <div className="guideseeup">
                    <div className="gsul">???????????????</div>
                    <div className="gsur">
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        style={{ color: "#a5a9f8" }}
                        size="1x"
                      />
                    </div>
                  </div>
                  <div className="guideseedown">
                    <div>
                      ?????? ????????? ?????? ????????? ?????????
                      <br />
                      ????????? ?????????.
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/create">
                <div className="createparty">
                  <div className="guideseeup">
                    <div className="gsul">?????? ?????????</div>
                    <div className="gsur">
                      <FontAwesomeIcon
                        icon={faPlusSquare}
                        style={{ color: "#a5a9f8" }}
                        size="1x"
                      />
                    </div>
                  </div>
                  <div className="guideseedown">
                    ?????? ????????? ?????????
                    <br />
                    ????????? ?????? ????????? ?????????.
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="searchright">
            <div className="searchrightheader">
              <div className="srhleft">
                <select
                  className="period"
                  value={periodState}
                  onChange={(e) => {
                    dispatch(setPeriodForFilter(Number(e.target.value)));
                  }}
                >
                  <option value="0">?????? ??????</option>
                  <option value="2">2??????</option>
                  <option value="3">3??????</option>
                  <option value="4">4??????</option>
                  <option value="5">5??????</option>
                  <option value="6">6??????</option>
                  <option value="7">7??????</option>
                  <option value="8">8??????</option>
                  <option value="9">9??????</option>
                  <option value="10">10??????</option>
                  <option value="11">11??????</option>
                  <option value="12">12??????</option>
                </select>
                <select
                  className="people"
                  value={membersNumState}
                  onChange={(e) => {
                    dispatch(setMembersNumForFilter(Number(e.target.value)));
                  }}
                >
                  <option value="0">?????? ??????</option>
                  <option value="2">2???</option>
                  <option value="3">3???</option>
                  <option value="4">4???</option>
                </select>
              </div>
              <div
                className="srhright"
                onClick={() => {
                  setPeriodForFilter(0);
                  setMembersNumForFilter(0);
                  dispatch(getAllParties({ id: ottId }));
                }}
              >
                {getOttKoreanNameById(ottId)} ???????????? ??????
              </div>
            </div>
            <div className="searchparty">
              {partiesState.length === 0 ? (
                <Warning />
              ) : (
                partiesState.map((party, i) => (
                  <Party
                    key={i}
                    party={party}
                    setSelectedParty={setSelectedParty}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {joinPartyModalState ? <JoinPartyModal party={selectedParty} /> : null}
      {confirmPaymentModalState ? (
        <ConfirmPaymentModal party={selectedParty} />
      ) : null}
    </>
  );
}

export default Search;
