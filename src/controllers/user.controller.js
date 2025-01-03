import {User} from '../models/user.model.js';
import {uploadFile} from "../utils/fileupload.js";

const userRegister = async (req, res) => {
	//get the user data from front end
	const {username, email, password, fullName} = req.body;
	// console.log(username, email, password, fullName);

	//validate the user data
	if (!username) return res.status(400).json({message: "Username is required"});
	if (!email) return res.status(400).json({message: "Email is required"});
	if (!password) return res.status(400).json({message: "Password is required"});
	if (!fullName) return res.status(400).json({message: "Full Name is required"});

	//check if the user is already in the database
	const userExist = await User.findOne({
		$or: [{
			username: username
		}, {
			email: email
		}]
	})
	if (userExist) {
		return res.status(400).json({
			message: "User already exists"
		});
	}

	//get the avtar from the request and store it on cloudinary
	const localAvtarPath = req.files.avtar ? req.files.avtar[0].path : res.status(400).json({message: "Avtar is required"});
	let avtarPath;
	if (localAvtarPath){
		avtarPath = await uploadFile(localAvtarPath);
	}

	//get the cover image from the request and store it on cloudinary
	const localCoverImagePath = req.files.coverImage ? req.files.coverImage[0].path : "";
	let coverImagePath;
	if (localCoverImagePath) {
		coverImagePath = await uploadFile(localCoverImagePath);
	}
	//create a new user object and save it to the database
	const user = await User.create({
		username: username,
		email: email,
		password: password,
		fullName: fullName,
		avtar: avtarPath,
		coverImage: coverImagePath ||"",
	})
	console.log(user);
	//check for user for creation
	if (!user) {
		return res.status(400).json({
			message: "User not created"
		});
	}

	//remove the password from the user object from response
	//return the user object

	return res.status(201).json({
		message: "User created successfully", user: {
			_id: user._id, avtar: user.avtar, coverImage: user.coverImage,
		}
	});
}
export default userRegister;