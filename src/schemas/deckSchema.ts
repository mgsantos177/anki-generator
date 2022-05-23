import { Schema, model, Types, Document } from "mongoose";

export interface IDeck extends Document {
  maxRevisionDay: Number;
  newCardsDay: Number;
  defaultStartingEase: Number;
  defaultIntervalModifier: Number;
}

const deckSchema: Schema = new Schema<IDeck>({
  maxRevisionDay: Number,
  newCardsDay: Number,
  defaultStartingEase: {
    type: Types.Decimal128,
  },
  defaultIntervalModifier: {
    type: Types.Decimal128,
  },
});

export default model(`Deck`, deckSchema);
