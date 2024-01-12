exports.countNullFields = (array) => {
	return array.filter((item) => {
		return Object.entries(item).some(([_k, v]) => {
			return v === null;
		});
	});
};

exports.currentDayMinusDays = (days) => {
	return new Date().getTime() - days * 24 * 60 * 60 * 1000;
};

exports.filterFromDate = (array, targetDate) => {
	const targetDateTime = this.currentDayMinusDays(targetDate);
	return array.filter((item) => {
		const poDate = new Date(item.EventDate ?? undefined).getTime();
		return poDate >= targetDateTime && poDate <= Date.now();
	}).length;
};

exports.filterUniqueEmails = (array) => {
	const emailMap = new Map();

	return array.filter((obj) => {
		const email = obj.Email;
		if (!emailMap.has(email)) {
			emailMap.set(email, true);
			return true;
		}
		return false;
	});
};
