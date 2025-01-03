import {v2 as cloudinary} from 'cloudinary';
import * as PROCESS from "node:process";
import * as fs from "node:fs";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image
export const uploadFile = async (localPath) => {
	try {
		if (!localPath) {
			throw new Error('Local path is required');
		}
		const result = await cloudinary.uploader.upload(localPath, {
			resource_type: 'auto'
		});


		return result.secure_url;


	} catch (error) {
		fs.unlinkSync(localPath);//remove the file from the local storage
		console.log(error);
	}
}