import { Schema } from "mongoose";

export const PictureSchema = new Schema(
  {
    imgUrl: { type: String, required: true, maxlength: 750 },
    albumId: { type: Schema.Types.ObjectId, required: true, ref: 'Album' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

PictureSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})