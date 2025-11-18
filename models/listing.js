const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
    },
    price: {
        type: Number
    },
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            default:'Point'
        },
        coordinates:{
            type:[Number],
            default: [73.8567, 18.5204]
        }
    }
});

listingSchema.post("findOneAndDelete", async function(listing) {
  if (listing) {
    const Review = mongoose.model("Review");
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;