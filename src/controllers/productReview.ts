import { Request, Response } from 'express';
import ProductReviewModel from '../models/productReviewModel';
import { ProductReview, ReviewItem } from '../interface/productReview';
import { Types } from 'mongoose';


export const addProductReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId, rating } = req.body;
      const userId = (req.user as { _id: string })._id.toString();
      const userIdObject = new Types.ObjectId(userId);
  
      const existingReview = await ProductReviewModel.findOne({
        productId,
        'review.ratedBy': userIdObject,
      });
  
      if (existingReview) {
        res.status(400).send({ message: 'You have already reviewed this product' });
        return;
      }
  
      const newReview: ReviewItem = {
        ratedBy: userIdObject,
        rating,
      };
  
      let productReview = await ProductReviewModel.findOne({ productId });
  
      if (!productReview) {
        productReview = new ProductReviewModel({
          productId,
          review: [newReview],
          totalRating: rating, 
        });
      } else {
        productReview.review.push(newReview);
  
        const totalRatings = productReview.review.reduce((sum, review) => sum + review.rating, 0);
        console.log("totalRatings",totalRatings)
        productReview.totalRating = totalRatings / productReview.review.length; 
        console.log("productReview.totalRating",productReview.totalRating)
      }
  
      await productReview.save();
  
      res.status(201).send({ message: 'Product review added successfully', productReview });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while processing your request!',error });
    }
  };