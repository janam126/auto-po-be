const getRngFrom = (from = 1, to = 100) => {
	return Math.ceil(Math.random() * (to - from)) + from;
};

module.exports = getRngFrom;
