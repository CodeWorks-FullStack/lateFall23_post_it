import { Schema } from "mongoose";

export const AlbumSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 30 },
    category: { type: String, enum: ['dogs', 'cats', 'games', 'gachamon', 'misc', 'asthetics', 'animals'], required: true, default: 'misc' },
    archived: { type: Boolean, required: true, default: false },
    coverImg: { type: String, required: true, maxlength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

AlbumSchema.virtual('memberCount', {
  localField: '_id',
  foreignField: 'albumId',
  ref: 'Collaborator',
  // NOTE don't return the data, just count how many matches there are
  count: true
})