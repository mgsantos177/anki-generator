import { CreateAnkiCardService } from "../services/CreateAnkiCardService";
import { Request, Response } from "express";

class CreateAnkiCardController {
  async execute(request: Request, response: Response): Promise<any> {
    const service = new CreateAnkiCardService();
    const { word } = request.params;
    const wordMeaning = await service.execute(word);

    return response.json(wordMeaning);
  }
}

export { CreateAnkiCardController };
