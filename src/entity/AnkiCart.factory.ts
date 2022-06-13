import { DictionaryApiResponseRoot } from "../interface/DictionaryApiResponse";

interface Definition {
  definition: string;
  example?: string;
  lexicalCategory: string;
}

export interface AnkiCard {
  front: string;
  back: string;
}

class AnkiCardFactory {
  private word: string;
  private definitions: Definition[] = [];
  private phoneticSpelling: string;
  private lexicalCategory: string;
  private example: string;

  createAnkiCard(wordDefinition: DictionaryApiResponseRoot): AnkiCard[] {
    const cards: AnkiCard[] = [];

    this.word = wordDefinition.word;
    for (const meaning of wordDefinition.meanings) {
      for (const definition of meaning.definitions) {
        this.definitions.push({
          lexicalCategory: meaning.partOfSpeech,
          ...definition,
        });
      }
    }
    this.phoneticSpelling = wordDefinition.phonetic;

    for (const definition of this.definitions) {
      const card: AnkiCard = {
        front: `${definition.example}`,
        back: `${this.word} /${this.phoneticSpelling}/ - ${definition.lexicalCategory} <br> ${definition.definition}`,
      };

      cards.push(card);
    }

    return cards;
  }
}

export { AnkiCardFactory };
