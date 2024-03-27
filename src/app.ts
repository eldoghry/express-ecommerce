import express from "express";
import dotenv from "dotenv";
dotenv.config();

import appSetup from "./startup/init";
import securitySetup from "./startup/secuirty";
import routerSetup from "./startup/router";

const app = express();

appSetup(app);
securitySetup(app, express);
routerSetup(app);
