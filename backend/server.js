import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDB();
});
