const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const { uploadNft } = require('../controller/nft');

const destination = path.join(process.cwd(), 'public/images');
const upload = multer({ dest: destination });

const nftRoute = new Router();

nftRoute.post('/nft', upload.single('nft'), uploadNft);

module.exports = {
	nftRoute,
};
