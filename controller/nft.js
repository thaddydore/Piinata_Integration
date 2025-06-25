const { uploadImage } = require('../util/uploadImage');
const { uploadMetaData } = require('../util/uploadMetaData');
const { generateMetaData } = require('../util/generateMetaData');

const uploadNft = async (req, res) => {
	try {
		const body = req.body;
		const file = req.file;
		const { name, description, trait, value } = body;

		if (!name || !description || !trait || !value) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required',
				data: null,
			});
		}

		const result = await uploadImage(file);
		const imageCID = result.IpfsHash;

		const generatedMetaData = generateMetaData(name, description, imageCID, trait, value);

		const metaDataResult = await uploadMetaData(generatedMetaData);
		const metaDataCID = metaDataResult.IpfsHash;

		res.status(200).json({
			success: true,
			message: 'NFT uploaded Successfully',
			data: {
				imageHash: imageCID,
				metaDataHash: metaDataCID,
				imageUrl: `https://salmon-impressive-antlion-291.mypinata.cloud/ipfs/${imageCID}`,
				metaDataUrl: `https://salmon-impressive-antlion-291.mypinata.cloud/ipfs/${metaDataCID}`,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
			data: null,
		});
	}
};

module.exports = {
	uploadNft,
};

// fetch(`https://salmon-impressive-antlion-291.mypinata.cloud/ipfs/${imageCID}`, {name: "image"}, {method: "POST"})

// axios.post(`https://salmon-impressive-antlion-291.mypinata.cloud/ipfs/${imageCID}`, {name: "image"}, {method: "POST"})
