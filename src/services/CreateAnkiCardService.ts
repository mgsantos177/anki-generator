import { api } from "../config/api";
import { AnkiCard, AnkiCardFactory } from "../entity/AnkiCart.factory";
import { DictionaryApiResponse } from "../interface/DictionaryApiResponse";

class CreateAnkiCardService {
  async execute(word: String): Promise<AnkiCard[]> {
    console.log(word);

    const wordDefition: DictionaryApiResponse = await api
      .get(`/${word}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw new Error(JSON.stringify(err));
      });

    const factory = new AnkiCardFactory();

    return factory.createAnkiCard(wordDefition[0]);
  }
}

export { CreateAnkiCardService };
