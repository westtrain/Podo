export const emailValidation = (email) => {
  const reg = /^\S+@\S+\.\S+$/;
  return reg.test(email) ? true : false;
};

export const passwordValidation = (password) => {
  const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return reg.test(password) ? true : false;
};
