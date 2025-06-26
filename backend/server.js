import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
dotenv.config();
const PORT = process.env.PORT || 3001;
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

//user route api endpoint

app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
