import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/API/userAPI";
import { showSelectProfileImageModal } from "../../redux/reducers/modalSlice";
import SelectProfileImage from "../../components/modal/SelectProfileImage";
import PartyCard from "./PartyCard";
import "../../style/MyPage.scss";
import PodoMoney from "../../image/PodoMoney.svg";
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

//import pngwing from "../../image/user.svg";

function MyParty(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const userPartyState = useSelector((state) => state.party.usersParty);
  const [profileImg, setProfileImg] = useState(profile0);
  const selectProfileModalState = useSelector(
    (state) => state.modal.selectProfileImageModal
  );
  const profileImgList = [
    profile0,
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
    profile7,
    profile8,
    profile9,
    profile10,
    profile11,
  ];
  const getUserImage = (imgID) => {
    setProfileImg(profileImgList[imgID]);
  };

  useEffect(() => {
    dispatch(getUser());
    getUserImage(userState.image);
  }, [profileImg, userState.image, selectProfileModalState]);

  return (
    <div className="middlemain">
      {selectProfileModalState ? <SelectProfileImage /> : null}
      <div className="profile">
        <div className="profilecolor"></div>
        <img
          src={profileImg}
          alt="user"
          className="user"
          onClick={() => {
            dispatch(showSelectProfileImageModal(true));
          }}
        ></img>
        <div className="username">{userState.name}</div>
      </div>
      <div className="mobilemoney">
        <div className="mup">
          나의 Podo머니
          <div className="mmoney">
            <img src={PodoMoney} alt="Podo" />
            {userState.money}원
          </div>
          <div className="mwithdrawal">인출하기</div>
        </div>
      </div>
      <div className="party">
        {userPartyState.map((party, i) => (
          <Link key={i} to={`/mypage/party/${party.id}`}>
            <PartyCard key={i} party={party} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyParty;
