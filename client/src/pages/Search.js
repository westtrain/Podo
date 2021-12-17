import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredParties } from "../redux/reducers/partySlice";
import {
  getAllParties,
  getFilteredParties,
  getFilterParties,
} from "../redux/API/partyAPI";
import { dateToStringDash } from "../utils/dateFunction";
import Header from "../components/public/Header";
import Party from "../components/search/Party";
import Warning from "../components/search/Warning";
import Calendar from "../components/search/Calendar";
import Loading from "../components/public/Loading";
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

function Search(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOtt, setSelectedOtt] = useState(netflix);
  const [ottId, setOttId] = useState(1);
  const [period, setPeriod] = useState(0);
  const [numOfMember, setNumOfMember] = useState(0);
  const [startDate, setStartDate] = useState(
    dateToStringDash(new Date().setDate(new Date().getDate() + 1))
  );
  const dispatch = useDispatch();
  const partiesState = useSelector((state) => state.party.parties);
  const loadingState = useSelector((state) => state.loading);
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

  const getOttReaderList = () => {
    const result = [];
    ottLogoList.map((ott, i) => {
      result.push(
        <li>
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

  useEffect(() => {
    async function asyncFunc() {
      if (startDate !== "") {
        console.log(startDate, ottId);
        await dispatch(getFilteredParties({ id: ottId, date: startDate }));
      } else {
        await dispatch(getAllParties({ id: ottId }));
      }
      if (period || numOfMember) {
        const filteredPaties = getFilterParties(
          partiesState,
          period,
          numOfMember
        );
        dispatch(setFilteredParties(filteredPaties));
      }
    }
    asyncFunc();
  }, [period, selectedOtt, numOfMember, startDate]);
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
                  <ul>{getOttReaderList()}</ul>
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
                    <div className="gsul">가이드보기</div>
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
                      파티 가입에 관한 자세한 정보를
                      <br />
                      확인해 보세요.
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/create">
                <div className="createparty">
                  <div className="guideseeup">
                    <div className="gsul">파티 만들기</div>
                    <div className="gsur">
                      <FontAwesomeIcon
                        icon={faPlusSquare}
                        style={{ color: "#a5a9f8" }}
                        size="1x"
                      />
                    </div>
                  </div>
                  <div className="guideseedown">
                    내가 원하는 조건의
                    <br />
                    파티를 직접 만들어 보세요.
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
                  value={period}
                  onChange={(e) => {
                    setPeriod(Number(e.target.value));
                  }}
                >
                  <option value="0">파티 기간</option>
                  <option value="2">2개월</option>
                  <option value="3">3개월</option>
                  <option value="4">4개월</option>
                  <option value="5">5개월</option>
                  <option value="6">6개월</option>
                  <option value="7">7개월</option>
                  <option value="8">8개월</option>
                  <option value="9">9개월</option>
                  <option value="10">10개월</option>
                  <option value="11">11개월</option>
                  <option value="12">12개월</option>
                </select>
                <select
                  className="people"
                  onChange={(e) => {
                    setNumOfMember(Number(e.target.value));
                  }}
                >
                  <option value="0">파티 인원</option>
                  <option value="2">2명</option>
                  <option value="3">3명</option>
                  <option value="4">4명</option>
                </select>
              </div>
              <div
                className="srhright"
                onClick={() => {
                  setPeriod(0);
                  setNumOfMember(0);
                }}
              >
                전체파티 조회
              </div>
            </div>
            <div className="searchparty">
              {partiesState.length === 0 ? (
                <Warning />
              ) : (
                partiesState.map((party, i) => <Party key={i} party={party} />)
              )}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Search;
