const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

const url = process.env.PINATA_URL_FILE;

async function uploadImage(file) {
	try {
		const data = new FormData();

		const fileStream = fs.createReadStream(file.path);

		// Create a promise that resolves when the file is fully read
		// const fileContent = await new Promise((resolve, reject) => {
		// 	const chunks = [];
		// 	const stream = fs.createReadStream(file.path);

		// 	stream.on('data', chunk => chunks.push(chunk));
		// 	stream.on('error', reject);
		// 	stream.on('end', () => resolve(Buffer.concat(chunks)));
		// });

		// Append the file buffer to form data
		data.append('file', fileStream, {
			filename: file.originalname,
			contentType: file.mimetype,
		});

		const response = await axios.post(url, data, {
			maxBodyLength: Infinity,
			headers: {
				'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				pinata_api_key: process.env.PINATA_API_KEY,
				pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error.response.data.error.details);
		const err = error?.response?.data?.error?.details ?? error?.response?.data?.message ?? error?.message;
		throw new Error(err);
	} finally {
		fs.unlinkSync(file.path);
	}
}

module.exports = { uploadImage };
