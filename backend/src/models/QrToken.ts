import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQrToken extends Document {
  court: mongoose.Types.ObjectId;
  code: string;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
}

const QrTokenSchema = new Schema<IQrToken>(
  {
    court: {
      type: Schema.Types.ObjectId,
      ref: 'Court',
      required: [true, 'Sân là bắt buộc'],
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// TTL index to automatically remove expired QR codes after 2 hours
QrTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 7200 });

export const QrToken: Model<IQrToken> = mongoose.model<IQrToken>('QrToken', QrTokenSchema);
