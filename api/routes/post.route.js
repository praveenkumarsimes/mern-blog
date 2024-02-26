import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost,SliderImagesCreate,getSliderImage,deleteImage } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.post('/createSlider/:userId',verifyToken, SliderImagesCreate)
router.get('/getposts', getposts)
router.get('/getSlider',verifyToken,getSliderImage)
router.delete('/deleteImage/:userId/:ImageIndex',verifyToken,deleteImage)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)


export default router;