import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
import { DictionaryService } from "../services/DictionaryService";
import * as googleTTS from "google-tts-api";

async function saveFile(text: string) {
  const url = await googleTTS.getAudioBase64(text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });

  const fileContents = Buffer.from(url, "base64");

  writeFileSync(`${__dirname}\\test.mp3`, fileContents);
}

class AnkiController {
  async get(request: Request, response: Response): Promise<any> {
    const service = new DictionaryService();
    const { language, word } = request.params;
    const wordMeaning = await service.get(word, language);

    return response.json(wordMeaning);
  }

  async randomWord(request: Request, response: Response): Promise<any> {
    const service = new DictionaryService();
    const file = readFileSync(`${__dirname}/englishWords.txt`, "utf-8");
    const lines = file.split("\n");
    const word = lines[Math.floor(Math.random() * lines.length)];

    const wordMeaning = await service.get(word);
    await saveFile(word);
    return response.json(wordMeaning);
  }
}

export { AnkiController };
