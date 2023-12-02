import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./routes/auth.js"

/* configuration */

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT
const MongoBD = process.env.MONGO_URL

try {
    mongoose.connect(MongoBD)
    .then(()=> console.log(`Database is connected . . .`))
} catch (error) {
    console.log(`Database is not connected !!! ${error}`);
}

app.use("/auth", router)

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
})

