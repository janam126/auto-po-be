exports.extractDateTime = (dateTimeString) => {
	const date = new Date(dateTimeString);

	const formattedDate = date.toISOString().split("T")[0];

	const formattedTime = date.toTimeString().split(" ")[0];

	return {
		date: formattedDate,
		time: formattedTime,
	};
};
