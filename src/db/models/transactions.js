import { Schema, model } from 'mongoose';

const transactionSchema = new Schema(
  {
    comment: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      default: 'income',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: function () {
        return this.type === 'expense';
      },
    },
    value: {
      type: Number,
      min: 0,
      required: [true, 'Funds value is required'],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Transaction = model('Transactions', transactionSchema);
