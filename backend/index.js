import express from "express";
import todosRoute from "./routes/todos.route.js";
import summarizeRoute from "./routes/summarize.route.js";
import { verifyToken } from "./middlewares/verify.js";
import cors from "cors";

const app = express();
app.use(cors(process.env.CLIENT_URL));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello there!");
});

app.use("/todos", verifyToken, todosRoute);
app.use("/summarize", summarizeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
