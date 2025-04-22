import { Schema, model } from 'mongoose';

const CATEGORIES = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
  'Entertainment',
];

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.index({ name: 1, type: 1 }, { unique: true });

categorySchema.statics.findByType = function (type) {
  return this.find({ type });
};

categorySchema.statics.DEFAULT_EXPENSE_CATEGORIES = CATEGORIES;

export const CategoryCollection = model('Category', categorySchema);