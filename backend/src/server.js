import "dotenv/config";
import express from "express";
import fundRouter from "./routes/fund.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/funds", fundRouter);

// Error middleware must be registered after routes
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});