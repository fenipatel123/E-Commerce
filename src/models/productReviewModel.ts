import mongoose, { Schema, Model } from 'mongoose';
import { ProductReview } from '../interface/productReview';

const productReviewSchema = new Schema<ProductReview>({
    review:[
        {
            ratedBy: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
            },
            rating:{ type: Number, required: true },

        }
    ],
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
    },
    totalRating: {
        type:Number, required: true
    }
    
}, {
    timestamps: true
});

const ProductReviewModel: Model<ProductReview> = mongoose.model<ProductReview>('ProductReview', productReviewSchema);

export default ProductReviewModel;