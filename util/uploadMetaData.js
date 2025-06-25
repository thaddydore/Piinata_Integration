const axios = require('axios');
require('dotenv').config();

const url = process.env.PINATA_URL_JSON;

async function uploadMetaData(metaData) {
	try {
		const response = await axios.post(url, metaData, {
			headers: {
				'Content-Type': 'application/json',
				pinata_api_key: process.env.PINATA_API_KEY,
				pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
			},
		});

		return response.data;
	} catch (error) {
		const err = error?.response?.data?.error?.error ?? error?.response?.data?.message ?? error?.message;
		throw new Error(err);
	}
}

module.exports = {
	uploadMetaData,
};
