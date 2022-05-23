import cardSchema, { ICard } from "../schemas/cardSchema";

export class CardService {
  async create(card: ICard) {
    return await cardSchema.create(card);
  }
}
