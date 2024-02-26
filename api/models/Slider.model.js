import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  // You can add additional fields here if needed
}, {_id: true});


const sliderScheema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
      sliderImages:{
        type:[imageSchema]
      }
},{timestamps:true});

const Slider = mongoose.model('slider',sliderScheema);
export default Slider;