import {User} from '../models/user.model.js';
import {uploadFile} from "../utils/fileupload.js";

const userRegister = async (req, res) => {
	//get the user data from front end
	console.log(req.body)
	const {username, email, password, fullName} = req.body;
	// console.log(username, email, password, fullName);

	//validate the user data
	if (!username) return res.status(400).json({message: "Username is required"});
	if (!email) return res.status(400).json({message: "Email is required"});
	if (!password) return res.status(400).json({message: "Password is required"});
	if (!fullName) return res.status(400).json({message: "Full Name is required"});

	//check if the user is already in the database
	const userExist = await User.findOne({
		$or: [{username: username}, {email: email}]
	})
	if (userExist) {
		return res.status(400).json({
			message: "User already exists"
		});
	}

	//get the avtar from the request and store it on cloudinary
	const localAvtarPath = req.files.avtar ? req.files.avtar[0].path : res.status(400).json({message: "Avtar is required"});
	let avtarPath;
	if (localAvtarPath) {
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
		coverImage: coverImagePath || "",
		refreshToken:""
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

const generateAccessAndRefreshToken = async (userId) => {
	const user = await User.findOne(userId);
	const accessToken = user.generateAccessToken();
	const refreshToken = user.generateRefreshToken();
	user.refreshToken = refreshToken;
	console.log("updated refreshtoken",refreshToken)
	console.log(await User.findOne({userId}))
	await user.save({validateBeforeSave: false});//
	return {accessToken, refreshToken};
}

const userLogin = async (req, res) => {
	console.log(req.body)
	//get the user data from the request
	const {email, password} = req.body;

	//validate user data
	if (!email) return res.status(400).json({message: "Email is required"});

	//check if the user is in the database
	const user = await User.findOne({email})
	if (!user) return res.status(400).json({message: "User not found"});
	//console.log("isPasswordCorrect exists:", typeof user.isPasswordCorrect === "function");


	//check if the password is correct
	const isPasswordValid = await user.isPasswordCorrect(password);
	if (!isPasswordValid) return res.status(400).json({
		messageerror: "Incorrect password"
	})

	//generate access token and refresh token and store in db
	const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
	console.log("genrated access token :",accessToken,user);


	//send the user object with access token in cookie
	return res.status(201)
		.cookie("accessToken", accessToken, {httpOnly: true, secure: true})
		.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true})
		.json({
			message: "User logged in successfully",
		});//you can use .end() to  the response without sending a body. or use send() to send a response body or json() to send a JSON response body.
}

const userLogout= async (req, res)=>{
	const userId = req.user._id.toString();
	await User.findByIdAndUpdate(
		userId,{
			$set:{refreshToken:undefined}
		},
		{
			new:true
		}
	)
	 return res.status(200)
		.clearCookie("accessToken", {httpOnly: true, secure: true})
		.clearCookie("refreshToken",{httpOnly: true, secure: true})
		.json({message:"logout"})
	console.log(res.cookies);
}
export {userRegister, userLogin,userLogout};