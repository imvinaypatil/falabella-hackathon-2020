const getSharePoints = totalShares => {
  if (totalShares > 1000) throw new Error("Maximum share rewards reached");
  return 1000;
};

const getQuizPoints = () => {
  // if (totalQuizes > 1000) throw new Error("Maximum quiz rewards reached");
  return 500;
};

const getCmrPoints = () => {
  return 50;
};

module.exports = {
  getSharePoints,
  getCmrPoints,
  getQuizPoints
};
