import { Router, Request, Response, response } from "express";
import { AnkiController } from "./controllers/AnkiController";

const anki = new AnkiController();

const router = Router();

router.get("/test/:word", anki.get);

router.get("/test1/1", (request: Request, response: Response) => {
  return response.json("a");
});

router.get("/anki/random", anki.randomWord);

export { router };
