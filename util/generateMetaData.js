function generateMetaData(name, description, imageCID, trait, value) {
	const metaData = {
		name,
		description,
		image: `ipfs://${imageCID}`,
		attributes: [
			{
				trait_type: trait,
				value,
			},
		],
	};

	return metaData;
}

module.exports = {
	generateMetaData,
};
