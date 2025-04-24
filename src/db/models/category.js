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
      enum: ['expense'],
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
  { versionKey: false, timestamps: true },
);

const CategoryCollection = model('Category', categorySchema);

(async () => {
  const count = await CategoryCollection.countDocuments({ type: 'expense' });
  if (count === 0) {
    await CategoryCollection.insertMany(
      CATEGORIES.map((name) => ({
        name,
        type: 'expense',
      })),
    );
  }
})();

export { CategoryCollection };
