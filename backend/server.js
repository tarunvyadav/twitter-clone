import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json()); //to parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form detail (urlencoded)

app.use(cookieParser())

app.use("/api/auth", authRoutes)

console.log(process.env.MONGO_URL)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
});