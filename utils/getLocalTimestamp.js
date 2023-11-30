const getLocalTimestamp = () => {
	const timestampUTC = Date.now();
	const offsetMinutes = new Date().getTimezoneOffset();
	const offsetMilliseconds = offsetMinutes * 60 * 1000;
	return timestampUTC - offsetMilliseconds;
};

module.exports = getLocalTimestamp;
