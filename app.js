import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import usuarioRoutes from "./routes/usuario.routes.js";
import productoRoutes from "./routes/producto.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Permite consumir la API desde Live Server (por ejemplo, http://127.0.0.1:5500).
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/usuarios", usuarioRoutes);
app.use("/productos", productoRoutes);

// Respuesta uniforme para rutas inexistentes.
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "No encontrado",
        mensaje: `La ruta ${req.method} ${req.originalUrl} no existe`
    });
});

// Manejo centralizado de errores HTTP y errores inesperados.
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            success: false,
            error: "JSON inválido",
            mensaje: "El cuerpo de la petición no contiene un JSON válido"
        });
    }

    console.error(err);
    return res.status(err.status || 500).json({
        success: false,
        error: err.status && err.status < 500 ? "Error de la petición" : "Error interno del servidor",
        mensaje: err.message || "Ocurrió un error inesperado"
    });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

export default app;
