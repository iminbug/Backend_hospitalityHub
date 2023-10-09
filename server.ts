import express, {Request, Response} from "express";

const cors = require("cors");

const app = express();
const PORT: number = 8080;
const HOST: string = "localhost";
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
  res.json({message: "Welcome to HospitalityHub application."});
});
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}.`);
});
