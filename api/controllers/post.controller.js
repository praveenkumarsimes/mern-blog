import Slider from '../models/Slider.model.js';
import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const SliderImagesCreate = async (req, res, next) => {
  // if (!req.user.isAdmin || req.user.id !== req.params.userId) {
  //   return next(errorHandler(403, 'You are not allowed to update this post'));
  // }
  let sliderImages = req.body
  try {
    let createImage;
    const findSliderExist = await Slider.findOne({ userId: req.user.id });

    if (findSliderExist) {
      // If the slider exists, update it by pushing new images
      // Assuming req.body.images is an array of image URLs
      const newImages = sliderImages?.map(img =>  img?.imageUrl);
      createImage = await Slider.findOneAndUpdate(
        { userId: req.user.id },
        { $push: { sliderImages: { $each: newImages } } }, // Use $each to push each item in newImages array
        { new: true } // Return the updated document
      );
    } else {
      // If the slider does not exist, create a new one
      // Convert array of image URLs to array of image subdocuments
      // const sliderImages = req.body.images.map(imageUrl => ({ imageUrl }));
      createImage = new Slider({
        userId: req.user.id,
        sliderImages
      });
      await createImage.save();
    }

    res.status(201).json({ status: true, createImage });
  } catch (error) {
    next(error);
  }
};


export const getSliderImage=async(req,res,next)=>{
  const getimg = await Slider.find()
   try {
    if(getimg.length === 0){
      return next(errorHandler(404, 'Slider Images Not Found'));
    } else{
      res.status(200).json({success:true,slider:getimg})
    }

   } catch (error) {
      next(error)    
   }
}

export const deleteImage= async(req,res,next)=>{
  console.log("test",req.params.ImageIndex)
  console.log("test",req.params.userId)
  console.log("test",req.user)
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  const updateSlider = Slider.findOne({userId:req.params.userId},{$pull : {sliderImages:req.params.ImageIndex}});
  console.log(updateSlider.sliderImages)
} 