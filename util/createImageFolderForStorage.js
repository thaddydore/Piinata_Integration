const fs = require('fs');
const path = require('path');

const createImageFolderForFileStorage = () => {
	const WD = process.cwd();

	const imagePath = path.join(WD, 'public/images');

	if (!fs.existsSync(imagePath)) {
		fs.mkdirSync(imagePath, { recursive: true });
	}
};

module.exports = {
	createImageFolderForFileStorage,
};
