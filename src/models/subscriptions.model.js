import mongoose from "mongoose";
const subscriptionsModel = new mongoose.Schema({
	//subscriber is the user who is subscribing
	subscriber: {
		type: mongoose.Schema.Types.ObjectId, ref: "User"
	}, //channel is the user who is being subscribed
	channel: {
		type: mongoose.Schema.Types.ObjectId, ref: "User",
	}
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription", subscriptionsModel)