import { Express } from "express";
import cors from "cors";

// store any security related things
const securitySetup = (app: Express, express: any) =>
  app.use(cors()).use(express.json());
export default securitySetup;
