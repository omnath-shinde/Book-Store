import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS policy - Cross-Origin Resource Sharing
// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         method: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Contet-Type"],
//     })
// );

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to BookStore");
});

app.use("/books", booksRoute);

const PORT = process.env.PORT || 8080;
mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
