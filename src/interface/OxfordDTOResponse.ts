export interface OxfordDTOResponse {
  definition?: string;
  phoneticSpelling?: string;
  lexicalCategory?: string;
  example?: string;
  ankiCard?: AnkiCard;
}

interface AnkiCard {
  front: string;
  back: string;
}
