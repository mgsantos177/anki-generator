import { Router, Request, Response, response } from "express";
import { AnkiController } from "./controllers/AnkiController";

const anki = new AnkiController();

const router = Router();

router.get("/:word", anki.get);

router.get("/anki/random", anki.randomWord);

export { router };
