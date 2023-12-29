import express from "express";
import "./database.js";
import authRouter from "./features/v1/shopkeeper/auth/routes/auth.js";

const app = express();

const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

router.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
