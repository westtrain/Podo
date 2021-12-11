import React, { useState } from "react";
import Header from "../components/public/Header";
import Party from "../components/search/Party";
import Calendar from "../components/search/Calendar";
import "../style/Search.scss";
import "../style/datepicker.scss";
import netflix from "../image/NetflixName.png";
import watcha from "../image/WatchaName.png";
import wavve from "../image/WavveName.svg";
import tving from "../image/TvingName.svg";
import disney from "../image/DisneyName.svg";
import prime from "../image/PrimeName.svg";
import laftel from "../image/LaftelName.svg";
import apple from "../image/AppleName.svg";
import office from "../image/Office365Name.png";
import coolicon from "../image/coolicon.png";
import airplane from "../image/airplane.png";
import create_party from "../image/create_party.png";

function Search(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handledropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <Header />
      <div className="search">
        <div className="searchbody">
          <div className="searchleft">
            <div className="wrapper">
              <div className="selectott" onClick={handledropdown}>
                <img src={netflix} alt="ottname" className="ottname"></img>
                <img src={coolicon} className="coolicon"></img>
              </div>
            </div>

            {showDropdown ? (
              <div className="modalback" onClick={handledropdown}>
                <div className="filterWindow dropdown" onClick={handledropdown}>
                  <ul>
                    <li>
                      <img src={netflix} alt="netflix" />
                    </li>
                    <li>
                      <img src={watcha} alt="watcha" />
                    </li>
                    <li>
                      <img src={wavve} alt="wavve" />
                    </li>
                    <li>
                      <img src={tving} alt="tving" />
                    </li>
                    <li>
                      <img src={disney} alt="disney" />
                    </li>
                    <li>
                      <img src={prime} alt="prime" />
                    </li>
                    <li>
                      <img src={laftel} alt="laftel" />
                    </li>
                    <li>
                      <img src={apple} alt="apple" />
                    </li>
                    <li>
                      <img src={office} alt="office" />
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
                    <img
                      src={airplane}
                      alt="airplane"
                      className="airplane"
                    ></img>
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
                    <img
                      src={create_party}
                      alt="create_party"
                      className="create_party"
                    ></img>
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
              <Party />
              <Party />
              <Party />
              <Party />
              <Party />
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Search;
