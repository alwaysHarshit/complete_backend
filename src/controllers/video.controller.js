import { Video } from '../models/video.js'
import {uploadFile} from "../utils/fileupload.js";

// upload a new video
 const uploadNewVideo = async (req, res) => {

	 try {
		const ownerName=req.user.username.toString();
		const {title, description}=req.body;
		const localVidePath = req.files.video[0].path ? req.files.video[0].path: res.status(400).json({message: "video is required"});

		const {secure_url,duration,size} = await uploadFile(localVidePath);
		const video={
			videoUrl:secure_url,
			title:title,
			description:description,
			duration: duration,
			size:size,
			owner:ownerName,
		}
		res.status(201).json({
			success: true,
			message: "Video uploaded successfully.",
		});
	} catch (error) {
		res.status(500).json({
			message: "An error occurred while creating the video.",
		});
	}
};

// Get a single video by title
const getVideoByTitle = async (req, res) => {
	try {
		const { title } = req.params;
		const videoURL = await Video.findById(title);

		if (!videoURL) {
			return res.status(404).json({
				success: false,
				message: "Video not found.",
			});
		}

		res.status(200).send(videoURL);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching the video.",
			error: error.message,
		});
	}
};

// Delete a video by ID
// Get all videos
export {uploadNewVideo,getVideoByTitle}