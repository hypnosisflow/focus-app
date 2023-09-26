import express from "express";
import mongoose from "mongoose";
import checkAuth from "./utils/checkAuth.js";
import { registerValidation } from "./validations/auth.js";

import cors from "cors";

import { register, login, check } from "./controllers/controllers.js";
import { create, getAllMoodCards } from "./controllers/mood.js";

const PORT = process.env.PORT || 5050;

mongoose
  .connect(
    "mongodb+srv://plzv92:arpolozov92@my-cluster.vb8w5g8.mongodb.net/focus?retryWrites=true&w=majority"
  )
  .then(() => console.log("db ok "))
  .catch((err) => console.log("db errror", err));
  
const app = express();

app.use(cors());
app.use(express.json());

// register
app.post("/auth/register", registerValidation, register);

//  login
app.post("/auth/login", login);

// chech auth
app.get("/auth/me", checkAuth, check);

// mood tracker
// create
app.post("/", create);

// get all cards
app.get("/", getAllMoodCards);

// listen port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
