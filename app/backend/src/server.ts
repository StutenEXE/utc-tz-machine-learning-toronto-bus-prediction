import express from "express";
import cors from "cors";
import busRoutes from "./routes/busRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/bus", busRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend running @ http://localhost:${PORT}`));
