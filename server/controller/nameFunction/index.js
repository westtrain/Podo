const { User } = require("../../models");
const adjective = require("./adjective");
const noun = require("./noun");

const getRandomNumber = (max) => {
  const result = Math.floor(Math.random() * max);
  return result;
};

const generateName = () => {
  const adjectiveWord = adjective[getRandomNumber(adjective.length)];
  const nounWord = noun[getRandomNumber(noun.length)];
  const result = `${adjectiveWord} ${nounWord}`;
  return result;
};

const nameArray = async () => {
  let nameArray = await User.findAll({ attribute: "name" });
  // name만 들어간 배열 만들기
  nameArray = nameArray.map((item) => {
    item = item.get({ plain: true });
    return item.name;
  });
  return nameArray;
};

const validate = (array, name) => {
  // 중복된 값이 없으면 true, 있으면 false
  if (!array.includes(name)) {
    return true;
  }
  return false;
};

module.exports = { generateName, getRandomNumber, nameArray, validate };
