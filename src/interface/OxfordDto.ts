export interface OxfordDTO {
  id: string;
  metadata: Metadata;
  results: Result[];
  word: string;
}

export interface Metadata {
  operation: string;
  provider: string;
  schema: string;
}

export interface Result {
  id: string;
  language: string;
  lexicalEntries: LexicalEntry[];
  type: string;
  word: string;
}

export interface LexicalEntry {
  entries: Entry[];
  language: string;
  lexicalCategory: LexicalCategory;
  text: string;
}

export interface Entry {
  pronunciations: Pronunciation[];
  senses: Sense[];
}

export interface Pronunciation {
  dialects: string[];
  phoneticNotation: string;
  phoneticSpelling: string;
  audioFile?: string;
}

export interface Sense {
  definitions: string[];
  id: string;
  examples?: Example[];
}

export interface Example {
  text: string;
}

export interface LexicalCategory {
  id: string;
  text: string;
}
