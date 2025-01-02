import {v2 as cloudinary} from 'cloudinary';
import * as PROCESS from "node:process";
import * as fs from "node:fs";

cloudinary.config({
	cloud_name: PROCESS.env.CLOUDINARY_CLOUD_NAME,
	api_key: PROCESS.env.CLOUDINARY_API_KEY,
	api_secret: PROCESS.env.CLOUDINARY_API_SECRET
});

// Upload an image
const uploadFile = async (localPath) => {
	try {
		if (!localPath) {
			throw new Error('Local path is required');
		}
		const result = await cloudinary.uploader.upload(localPath, {
			resource_type: 'auto'
		});
		console.log(result.secure_url) ;

	} catch (error) {
		fs.unlinkSync(localPath);//remove the file from the local storage
		return null;
	}
}