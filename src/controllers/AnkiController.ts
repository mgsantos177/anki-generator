import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
import { CreateAnkiCardService } from "../services/CreateAnkiCardService";
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
    const service = new CreateAnkiCardService();
    const { word } = request.params;
    const wordMeaning = await service.execute(word);

    return response.json(wordMeaning);
  }

  async randomWord(request: Request, response: Response): Promise<any> {
    const service = new CreateAnkiCardService();
    const file = readFileSync(`${__dirname}/englishWords.txt`, "utf-8");
    const lines = file.split("\n");
    const word = lines[Math.floor(Math.random() * lines.length)];

    const wordMeaning = await service.execute(word);
    await saveFile(word);
    return response.json(wordMeaning);
  }
}

export { AnkiController };
