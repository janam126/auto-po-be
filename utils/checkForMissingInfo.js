const checkForNull = (data) => {
	const fieldsWithNull = [];

	Object.entries(data).forEach(([k, v]) => {
		if (v === null) fieldsWithNull.push(k);
	});

	return fieldsWithNull.length > 0 ? fieldsWithNull : null;
};

exports.checkForMissingInfo = (document) => {
	const item = document?.toObject();

	return checkForNull(item);
};
