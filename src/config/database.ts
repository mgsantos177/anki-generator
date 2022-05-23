import mongoose from "mongoose";
import { logger } from "./pino";

class Mongoose {
  constructor() {
    this.init();
  }

  async init() {
    await mongoose.connect(`${process.env.MONGO_URL}`);

    logger.info(`mongoose conectado ${process.env.MONGO_URL}`);
  }

  async disconnect() {
    await mongoose.connection.close();
  }
}

export default new Mongoose();
