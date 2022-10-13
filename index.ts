import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { register } from "./interfaces/register.interface";
import { biodata } from "./interfaces/biodata.interface";
import mongoose, { ConnectOptions } from "mongoose";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const BASE_URL: string = "/auth/v1";
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/crypto-market',{
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions, () => {
    console.log("Connected to database")
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

mongoose.model("UserCredentials",userSchema, "User-Credentials").create({
    username: "yincoos01",
    password: "Blessing091",
    email: "yincoos@gmail.com",

});

app.get('/', (req: Request, res: Response) => {
    console.log(req.query)
  res.send('Express + TypeScript Server');
});

app.post(`${BASE_URL}/register`, (req: Request, res: Response) => {
  let data: register = req.body;
  console.log(data);//
  res.status(201).json({
    message: "User registered successfully",
  });
});

app.post(`${BASE_URL}/biodata`, (req: Request, res: Response) => {
    let data: biodata = req.body;
    console.log(data);//
    res.status(201).json({
      message: "User Bio_Data successfully Updated",
    });
  });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
