import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js"
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



app.use(express.json()); //to parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form detail (urlencoded)

app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)

console.log(process.env.MONGO_URL)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
});