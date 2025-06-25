const express = require('express');
const dotenv = require('dotenv');
const { createImageFolderForFileStorage } = require('./util/createImageFolderForStorage');
const { nftRoute } = require('./routes/nft');

dotenv.config();

const PORT = process.env.PORT || 3000;

createImageFolderForFileStorage();

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use('/api/v1', nftRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
