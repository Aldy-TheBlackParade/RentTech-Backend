import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import itemRoute from "./routes/itemRoute.js";
import cartRoute from "./routes/cartRoute.js";
import checkoutRoute from "./routes/checkoutRoute.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json" assert { type: "json" };

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/items", itemRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkouts", checkoutRoute);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_req, res) => {
  res.send("Welcome to the RentTech API!");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server ready on http://localhost:${port}`);
});
