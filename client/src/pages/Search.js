import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOttId, getOttName, getAllParties } from "../redux/API/partyAPI";
import Header from "../components/public/Header";
import Party from "../components/search/Party";
import Warning from "../components/search/Warning";
import Calendar from "../components/search/Calendar";
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
  const [period, setPeriod] = useState("");
  const [people, setPeople] = useState("");
  const dispatch = useDispatch();
  const partiesState = useSelector((state) => state.party.parties);

  useEffect(async () => {
    dispatch(getAllParties({ id: ottId }));
  }, [period, selectedOtt, people]);
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
                  <ul>
                    <li>
                      <img
                        src={netflix}
                        alt="netflix"
                        height="30px"
                        onClick={() => {
                          setOttId(1);
                          setSelectedOtt(netflix);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={watcha}
                        alt="watcha"
                        height="45px"
                        onClick={() => {
                          setOttId(2);
                          setSelectedOtt(watcha);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={wavve}
                        alt="wavve"
                        onClick={() => {
                          setOttId(3);
                          setSelectedOtt(wavve);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={tving}
                        alt="tving"
                        height="25px"
                        onClick={() => {
                          setOttId(4);
                          setSelectedOtt(tving);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={disney}
                        alt="disney"
                        onClick={() => {
                          setOttId(5);
                          setSelectedOtt(disney);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={prime}
                        alt="prime"
                        onClick={() => {
                          setOttId(6);
                          setSelectedOtt(prime);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={laftel}
                        alt="laftel"
                        onClick={() => {
                          setOttId(7);
                          setSelectedOtt(laftel);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={apple}
                        alt="apple"
                        onClick={() => {
                          setOttId(8);
                          setSelectedOtt(apple);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={office}
                        alt="office"
                        onClick={() => {
                          setOttId(9);
                          setSelectedOtt(office);
                        }}
                      />
                    </li>
                    <li>
                      <img
                        src={nintendo}
                        alt="nintendo"
                        onClick={() => {
                          setOttName(nintendo);
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
            <div className="calendar">
              <Calendar />
            </div>
            <div className="searchleftdown">
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
            </div>
          </div>
          <div className="searchright">
            <div className="searchrightheader">
              <div className="srhleft">
                <select className="period">
                  <option key="period" value="period">
                    파티 기간
                  </option>
                </select>
                <select className="people">
                  <option key="people" value="people">
                    파티 인원
                  </option>
                </select>
              </div>
              <div className="srhright">전체파티 조회</div>
            </div>
            <div className="searchparty">
              {partiesState.map((party) => (
                <Party party={party} />
              ))}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Search;
