import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Routes from "./routes/index";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api', Routes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
