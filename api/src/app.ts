import "express-async-errors";
import "./database";
import cors from "cors";
import express from "express";
import { router } from "./router";
import { handlerError } from "./errors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(handlerError);

export { app };
