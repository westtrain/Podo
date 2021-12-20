import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { getUser, updateProfileImage } from "../../redux/API/userAPI";
import { showSelectProfileImageModal } from "../../redux/reducers/modalSlice";
import "../../style/Modal.scss";
import { BsXLg } from "react-icons/bs";
import profile0 from "../../image/profile0.svg";
import profile1 from "../../image/profile1.svg";
import profile2 from "../../image/profile2.svg";
import profile3 from "../../image/profile3.svg";
import profile4 from "../../image/profile4.svg";
import profile5 from "../../image/profile5.svg";
import profile6 from "../../image/profile6.svg";
import profile7 from "../../image/profile7.svg";
import profile8 from "../../image/profile8.svg";
import profile9 from "../../image/profile9.svg";
import profile10 from "../../image/profile10.svg";
import profile11 from "../../image/profile11.svg";

function SelectProfileImage() {
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState(profile0);
  const [selectedImgId, setSelectedImgId] = useState(0);

  const onClickImage = (e) => {
    setSelectedImg(e.target.src);
    setSelectedImgId(e.target.id);
  };

  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler
            onOutsideClick={() => dispatch(showSelectProfileImageModal(false))}
          >
            <div className="selectprofilemodalview">
              <div className="exit">
                <div
                  onClick={() => dispatch(showSelectProfileImageModal(false))}
                >
                  <BsXLg />
                </div>
              </div>
              <div className="spimheader">
                <div>
                  <div className="spimhfirst">
                    <div className="spipmhff">프로필이미지를 선택해주세요</div>
                  </div>
                  <div className="spimain">
                    <img src={selectedImg} alt="profile"></img>
                  </div>
                </div>
              </div>
              <div className="selectimg">
                <img
                  id="0"
                  src={profile0}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="1"
                  src={profile1}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="2"
                  src={profile2}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="3"
                  src={profile3}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="4"
                  src={profile4}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="5"
                  src={profile5}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="6"
                  src={profile6}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="7"
                  src={profile7}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="8"
                  src={profile8}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="9"
                  src={profile9}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="10"
                  src={profile10}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
                <img
                  id="11"
                  src={profile11}
                  alt="profile"
                  onClick={onClickImage}
                ></img>
              </div>

              <button
                className="partysignbtn"
                onClick={async () => {
                  await updateProfileImage(selectedImgId);
                  dispatch(getUser());
                  dispatch(showSelectProfileImageModal(false));
                }}
              >
                <div className="partysignbtnw">변경하기</div>
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
}

export default SelectProfileImage;
