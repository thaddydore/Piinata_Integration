const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createImageFolderForFileStorage } = require('./util/createImageFolderForStorage');
const { nftRoute } = require('./routes/nft');

dotenv.config();

const PORT = process.env.PORT || 3000;

createImageFolderForFileStorage();

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use('/api/v1', nftRoute);
app.use('/api/v1/healthz', (_, res) => res.send('OK'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
