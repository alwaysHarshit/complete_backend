import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-aggregate-paginate-v2';
const videoSchema = new mongoose.Schema(
    {
        videoUrl:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        duration:{
            type: Number,
            required: true,
        },
        views:{
            type: Number,
        },
        size:{
            type:Number
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

    },
    { timestamps: true} //this will add created at and updated at
);
//The line `videoSchema.plugin(mongoosePaginate);` is adding the `mongoose-paginate-v2` plugin to the `videoSchema`. This plugin provides pagination capabilities to the Mongoose schema, allowing you to easily paginate through the documents in the `Video` collection.
videoSchema.plugin(mongoosePaginate);
export const Video = mongoose.model('Video', videoSchema);