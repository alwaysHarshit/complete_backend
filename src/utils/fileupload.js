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

		if (result.resource_type === 'video') {
			return {
				secure_url: result.secure_url,
				duration: result.duration,
				size: result.bytes,
			};
		} else if (result.resource_type === 'image') {
			return  result.secure_url;
		}

	} catch (error) {
		fs.unlinkSync(localPath); // remove the file from local storage
		console.log(error);
	}
}
