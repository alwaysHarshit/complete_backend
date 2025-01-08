import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const verifyJWtToken= async (req, res, next) => {

		let token = req.headers.authorization
		console.log("**incoming access-token from logout**",token)
		token=token.replace("Bearer ","")

		if (!token) return res.status(401).json({messageerror: "Unauthorized request"})
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

		console.log("##decoded token ##",decodedToken)
		const _id=decodedToken._id;
		const user = await User.findOne({_id}).select("-password -refreshToken");
		if (!user) return res.status(401).json({messageerror: "Invalid access token"})
		req.user = user;
		next();
}