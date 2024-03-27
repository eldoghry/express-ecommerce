import { Express } from "express";
import typeORMConnect from "../database/typeorm";

const appSetup = async (app: Express) => {
  const APP_PORT = process.env.APP_PORT || 4000;

  try {
    await typeORMConnect();
    console.log("connected to database successfully");
  } catch (error) {
    console.log("unable to connect to database");
    throw error;
  }

  app.listen(APP_PORT, () => console.log(`Server started on port ${APP_PORT}`));
};

export default appSetup;
