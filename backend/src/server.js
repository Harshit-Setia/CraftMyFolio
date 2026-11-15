import "dotenv/config";
import { connectDB } from "./config/db.js";
import { app } from "./app.js";
import { purgeVisitorHashes } from "./controllers/analyticsController.js";

const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("Server is running");
});

const startServer = async () => {
  try {
    await connectDB();

    const purge = () => purgeVisitorHashes().catch((err) => console.error("Analytics purge failed:", err.message));
    purge();
    setInterval(purge, 6 * 60 * 60 * 1000).unref();

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    process.on("SIGINT", () => {
      console.log("Shutting down server...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
