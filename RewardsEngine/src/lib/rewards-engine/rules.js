const genShareRewards = totalShares => {
  if (totalShares > 1000) throw new Error("Maximum share rewards reached");
  return 100;
};

const genQuizRewards = totalQuizes => {
  if (totalQuizes > 1000) throw new Error("Maximum quiz rewards reached");
  return 100;
};

const genCMRrewards = () => {
  return 50;
};

module.exports = {
  genShareRewards,
  genCMRrewards,
  genQuizRewards
};
