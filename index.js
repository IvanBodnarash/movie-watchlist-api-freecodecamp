import express from "express";
import helmet from "helmet";

import loginRoutes from "./routes/login.js";
import watchlistRoutes from "./routes/watchlist.js";

import { authenticate } from "./middleware/authenticate.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.use("/api/auth/login", loginRoutes);
app.use("/api/watchlist", authenticate, watchlistRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
