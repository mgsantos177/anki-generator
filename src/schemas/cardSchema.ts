import { Schema, model, Types, Document } from "mongoose";

export interface ICard extends Document {
  front: String;
  back: string;
  cardEase: Number;
  interval: Number;
  audio?: Buffer;
  deckId: Types.ObjectId;
  beggining: Boolean;
  revisionDate: Date;
}

const CardSchema: Schema = new Schema<ICard>({
  front: String,
  back: String,
  cardEase: {
    type: Types.Decimal128,
  },
  interval: {
    type: Types.Decimal128,
  },
  audio: {
    type: Types.Buffer,
  },
  beggining: {
    type: Boolean,
    default: true,
  },
  revisionDate: {
    type: Date,
    default: new Date(),
  },
  deckId: { type: Schema.Types.ObjectId, ref: "Deck" },
});

export default model<ICard>(`Card`, CardSchema);
