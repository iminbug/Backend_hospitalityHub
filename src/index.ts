import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());
const server = http.createServer(app);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const MONGOURL =
  "mongodb+srv://iminbug:iminbug@cluster0.xyljqvf.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;

mongoose.connect(MONGOURL);

mongoose.connection.on("open", () => {
  console.log("DataBase connected ");
});

mongoose.connection.on("error", (error) => {
  console.error("Database Not connected", error);
});
