import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/public/Header";
import FAQ from "../components/public/FAQ";
import "../style/Home.scss";
import { ottImage, ottImageClass } from "../utils/dateFunction";
import ScrollTop from "../components/public/ScrollTop";
import logo from "../image/Podo_logo.svg";
import landingimg1 from "../image/landingimg1.png";
import landingimg2 from "../image/landingimg2.png";
import landingimg3 from "../image/landingimg3.png";
import landingimg4 from "../image/landingimg4.png";
import landingimg5 from "../image/landingimg5.png";

const Home = (props) => {
  const ottElements = () => {
    const result = [];
    Object.keys(ottImage, ottImageClass).map((ottName) => {
      result.push(
        <img
          className={ottImageClass[ottName]}
          src={ottImage[ottName]}
          alt="Some image"
        />
      );
    });
    return result;
  };
  useEffect(() => {
    //viewport에 들어올 경우 class변경
    const targets = document.querySelectorAll(".landingexpimg");
    //threshold 0.5만큼 보였을 경우 실행
    const options = { root: null, threshold: 0.5, rootMargin: "0px" };
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        const container = entry.target;
        //class변경
        if (entry.isIntersecting) {
          container.classList.remove("landingexpimg");
          container.classList.add("fade-in");
        } else {
          container.classList.remove("fade-in");
          container.classList.add("landingexpimg");
        }
      });
    }, options);

    targets.forEach((target) => {
      observer.observe(target);
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".panel__img", {
      scrollTrigger: ".panel__img",
      duration: 4,
      opacity: 1,
      // y: "200%",
      x: "200%",
    });
  }, []);

  return (
    <>
      <Header />
      <ScrollTop />
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
          <div id="image" className="landingexpimg">
            <img src={landingimg1} alt="landingimg1"></img>
          </div>
        </div>
        <div className="landingpage">
          <div id="image" className="landingexpimg">
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
          <div id="image" className="landingexpimg">
            <img src={landingimg3} alt="landingimg3"></img>
          </div>
        </div>
        <div className="landingpage">
          <div id="image" className="landingexpimg">
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
        <div class="panel">{ottElements()}</div>
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
        <div className="footer">
          <div className="footerup">
            <div className="logo">
              <div>
                <img src={logo} alt="logo"></img>
              </div>
              <span className="name">Podo</span>
            </div>

            <div className="service">
              <div className="footerhead">서비스 소개</div>
              <div className="line"></div>
              <a href="https://github.com/codestates/podo">
                <div className="list">Repository</div>
              </a>
              <a href="https://github.com/codestates/podo/wiki">
                <div className="list">WIKI</div>
              </a>
            </div>
            <div className="member">
              <div className="footerhead">Team Members</div>
              <div className="line"></div>
              <a href="https://github.com/LauraBoraKim">
                <div className="list">김보라</div>
              </a>
              <a href="https://github.com/phosa9203">
                <div className="list">김태우</div>
              </a>
              <a href="https://github.com/westtrain">
                <div className="list">이원구</div>
              </a>
              <a href="https://github.com/cherishxyun">
                <div className="list">하승윤</div>
              </a>
            </div>
          </div>
          {/* <div className="footerdown">
            <div>Copyright</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
