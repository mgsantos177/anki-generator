import axios from "axios";
import { OxfordDTO } from "../interface/OxfordDto";
import { OxfordDTOResponse } from "../interface/OxfordDTOResponse";

class DictionaryService {
  async get(word: String, language?: String): Promise<OxfordDTOResponse[]> {
    console.log(word);
    const resp: OxfordDTO = await axios
      .get(
        `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}?fields=definitions,examples,pronunciations&strictMatch=false`,
        {
          headers: {
            app_id: process.env.OXFORD_APP_ID || "",
            app_key: process.env.OXFORD_APP_KEY || "",
          },
        }
      )
      .then((r) => {
        return r.data;
      });

    const ankiResults: OxfordDTOResponse[] = [];
    for (const result of resp.results) {
      for (const entry of result.lexicalEntries) {
        let phoneticSpelling = "";
        let example = "";
        let definition = "";

        if (entry.entries) {
          const useEntry = entry.entries[0];

          if (useEntry.pronunciations) {
            phoneticSpelling = useEntry.pronunciations[0].phoneticSpelling;
          }

          definition = useEntry.senses[0].definitions[0];

          if (useEntry.senses[0].examples) {
            example = useEntry.senses[0].examples[0].text;
          }
        }
        const lexicalCategory = entry.lexicalCategory.text;

        const anki = {
          word: result.word,
          definition,
          phoneticSpelling,
          lexicalCategory,
          example,
          ankiCard: {
            front: result.word,
            back: `${result.word} /${phoneticSpelling}/ <br> ${definition}`,
          },
        };

        ankiResults.push(anki);
      }
    }

    return ankiResults;
  }
}

export { DictionaryService };
