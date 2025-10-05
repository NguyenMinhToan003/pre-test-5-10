require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { CONNECT_DB, GET_DB } = require("./config/db");
const { authRouter } = require("./routes/auth");
const { revenueRouter } = require("./routes/revenue");
const { userRouter } = require("./routes/user");
const setupSwagger = require("./config/swagger");

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const startServer = async () => {
  try {
    await CONNECT_DB();
    GET_DB();
    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    app.use('/api/auth', authRouter);
    app.use('/api/revenue', revenueRouter);
    app.use('/api/user', userRouter);
    setupSwagger(app);
    // 404 
    app.use((req, res, next) => {
      res.status(404).json({ message: "Endpoint not found" });
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`✅ Server is running on port ${PORT}`)
    );
  } catch (err) {
    console.error('❌ error:', err.message);
    process.exit(1);
  }
};

startServer();
