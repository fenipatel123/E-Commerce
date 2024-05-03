import mongoose from 'mongoose';

export interface ReviewItem {
    ratedBy: mongoose.Types.ObjectId;
    rating: number;
  }

export interface ProductReview{
    productId: mongoose.Types.ObjectId; 
    review: ReviewItem[];
    totalRating: number;
    createdAt: Date;
    updatedAt: Date;
}
  