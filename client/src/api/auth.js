const authApi = () => {
  const kakao = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`;
  };
  const google = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };
  const naver = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/naver`;
  };
  return (
    <>
      <button onClick={kakao}>kakao</button>
      <button onClick={google}>google</button>
      <button onClick={naver}>naver</button>
    </>
  );
};

export default authApi;
