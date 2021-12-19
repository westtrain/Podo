import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/API/userAPI";
import { logOut } from "../../redux/reducers/userSlice";
import { setDefaultURI } from "../../redux/reducers/loginURISlice";
import Swal from "sweetalert2";

function MyLogin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const errorState = useSelector((state) => state.error);

  const onClickWithdrwal = () => {
    dispatch(deleteUser());
    if (errorState) {
      if (errorState.status === 422) {
        Swal.fire(
          "Unsuccess!",
          "사용 중인 파티가 있을 경우, 탈퇴가 불가해요.🥺",
          "error"
        );
      }
      Swal.fire(
        "Unsuccess!",
        "탈퇴에 실패했습니다. 다시 시도해주세요.🥺",
        "error"
      );
    } else {
      Swal.fire(
        "Success!",
        "탈퇴를 완료했습니다.언제든 다시 찾아와주세요.🙂",
        "success"
      );
      dispatch(setDefaultURI());
      dispatch(logOut());
      navigate("/");
    }
  };
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">로그인 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="nowlogininfo">현재 연결된 소셜 로그인 계정</div>
              <div className="social">
                {userState.socialType}
                <div
                  className="logoutbtn"
                  onClick={() => {
                    dispatch(logOut());
                    dispatch(setDefaultURI());
                    return navigate("/");
                  }}
                >
                  로그아웃
                </div>
              </div>
            </div>
            <div className="withdrawal" onClick={onClickWithdrwal}>
              탈퇴하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyLogin;
