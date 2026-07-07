import express from "express";
import path from "path";
import apiRouter from "./backend/routes";

const app = express();
const PORT = 3000;

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Coaching server running on http://0.0.0.0:${PORT}`);
});
export default app;
