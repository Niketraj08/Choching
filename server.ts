import express from "express";
import path from "path";
import apiRouter from "./backend/routes";

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());

// Mount separated backend router
app.use("/api", apiRouter);

// --- Vite Dev Server Middleware Integration ---
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  import("vite").then(async (viteModule) => {
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "localhost", () => {
  console.log(`Coaching server running on http://localhost:${PORT}`);
});
export default app;
