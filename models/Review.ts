// models/Review.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  name: string;
  email: string;
  area: string;
  rating: number;
  quote: string;
  avatar?: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    quote: { type: String, required: true, trim: true },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;