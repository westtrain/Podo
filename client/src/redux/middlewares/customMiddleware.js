const customMiddleware = (storeApi) => {
  return (next) => {
    return (action) => {
      // 개발자는 이곳에 자신의 목적에 알맞은 코드를 추가할 수 있습니다.
      // ...

      return next(action);
    };
  };
};

export default customMiddleware;
