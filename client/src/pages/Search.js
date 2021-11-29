import React from "react";
import Header from "../components/public/Header";
import Party from "../components/search/Party";
import "../style/Search.scss";
import netflixname from "../image/NetflixName.png";
import coolicon from "../image/coolicon.png";
import airplane from "../image/airplane.png";
import create_party from "../image/create_party.png";

function Search(props) {
  return (
    <>
      <Header />
      <div className="search">
        <div className="searchbody">
          <div className="searchleft">
            <div className="selectott">
              <img src={netflixname} alt="ottname" className="ottname"></img>
              <img src={coolicon} className="coolicon"></img>
            </div>
            <div className="calendar"></div>
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
