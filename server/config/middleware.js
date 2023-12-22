import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const configureMiddleware = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["https://shopionz.vercel.app"],
      methods: ["GET", "POST", "PUT"],
      credentials: true,
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      key: "shopionzUser",
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000,
      },
    })
  );
};

export default configureMiddleware;
