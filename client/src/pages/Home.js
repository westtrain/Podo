import React from "react";
import Header from "../components/public/Header";
import FAQ from "../components/public/FAQ";
import "../style/Home.scss";
import landingimg1 from "../image/landingimg1.png";
import landingimg2 from "../image/landingimg2.png";
import landingimg3 from "../image/landingimg3.png";
import landingimg4 from "../image/landingimg4.png";
import landingimg5 from "../image/landingimg5.png";

function Home(props) {
  return (
    <>
      <Header />
      <div className="banner">
        <div className="wrapper">
          <span>
            넷플릭스 한달 요금으로
            <br />
            왓챠, 웨이브, 디즈니플러스까지
          </span>
        </div>
      </div>
      <div className="homemiddle">
        <div className="landingpage">
          <div className="landingexp">
            <div className="landingexpheader">
              OTT플랫폼의 시대 <br />
              얇아지는 지갑
            </div>
            <div className="landingexpmiddle">
              다양한 OTT플랫폼의
              <br />
              저렴한 파티 가격을 비교해보세요.
            </div>
          </div>
          <div className="landingexpimg">
            <img src={landingimg1} alt="landingimg1"></img>
          </div>
        </div>
        <div className="landingpage">
          <div className="landingexpimg">
            <img src={landingimg2} alt="landingimg2"></img>
          </div>
          <div className="landingexp">
            <div className="landingexpheader">
              파티에 가입해
              <br />
              구독료를 절약하세요
            </div>
            <div className="landingexpmiddle">
              다양한 OTT플랫폼을 <br />
              합리적인 가격으로 즐겨보세요.
            </div>
          </div>
        </div>
        <div className="landingpage">
          <div className="landingexp">
            <div className="landingexpheader">
              원하는 파티를
              <br />
              직접 만들 수 있어요
            </div>
            <div className="landingexpmiddle">
              내게 딱 맞는 조건의 OTT파티를 직접 만들어 <br />
              파티원을 모집해 보세요.
            </div>
          </div>
          <div className="landingexpimg">
            <img src={landingimg3} alt="landingimg3"></img>
          </div>
        </div>
        <div className="landingpage">
          <div className="landingexpimg">
            <img src={landingimg4} alt="landingimg4"></img>
          </div>
          <div className="landingexp">
            <div className="landingexpheader">
              Podo를 통한
              <br />
              안전한 구독 공유
            </div>
            <div className="landingexpmiddle">
              커뮤니티 기반의 OTT 파티원 모집보다
              <br />더 투명하고 안전한 거래를 경험하세요.
            </div>
          </div>
        </div>
        <div className="landingpagefooter">
          <div className="landingexpimg">
            <img src={landingimg5} alt="landingimg5"></img>
          </div>
          <div className="landingexp">
            <div className="landingexpfooter">
              Podo와 함께
              <br />
              다양한 컨텐츠를 즐기세요!
            </div>
          </div>
        </div>
        <FAQ />
        <div className="footer"></div>
      </div>
    </>
  );
}

export default Home;
