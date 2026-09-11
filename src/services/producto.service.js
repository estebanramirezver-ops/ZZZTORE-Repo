import { obtenerTodos, obtenerPorId, crear } from "../repositories/producto.repository.js";

const CATEGORIAS_VALIDAS = ["Agent", "W-Engine", "Drive Disc", "Material", "Skin"];
const SUBCATEGORIAS_VALIDAS = {
    "Agent": [
        "Eléctrico / Ataque",
        "Ether / Soporte",
        "Físico / Ataque",
        "Hielo / Aturdimiento",
        "Hielo / Ataque",
        "Fuego / Ataque",
        "Eléctrico / Aturdimiento",
        "Ether / Anomalía"
    ],
    "W-Engine": ["Bangboo"],
    "Drive Disc": ["Set de 2 / 4 piezas"],
    "Material": ["Moneda principal", "Experiencia", "Mejora W-Engine", "Ascensión Agent"],
    "Skin": ["Cosmético Agent", "Cosmético Bangboo"]
};
const RAREZAS_VALIDAS = ["Común", "Poco común", "Raro", "Épico", "A", "S"];

export const listarProductos = async () => obtenerTodos();

export const buscarProducto = async (id) => {
    const producto = await obtenerPorId(id);

    if (!producto) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        throw error;
    }

    return producto;
};

export const registrarProducto = async (datos) => {
    const errores = validarProducto(datos);

    if (errores.length > 0) {
        const error = new Error("Datos de producto inválidos");
        error.status = 400;
        error.detalles = errores;
        throw error;
    }

    const productoLimpio = {
        nombre: datos.nombre.trim(),
        categoria: datos.categoria,
        subcategoria: datos.subcategoria,
        rareza: datos.rareza,
        precio: Number(datos.precio),
        descripcion: typeof datos.descripcion === "string" ? datos.descripcion.trim() : "",
        imagen: typeof datos.imagen === "string" ? datos.imagen.trim() : ""
    };

    return crear(productoLimpio);
};

const validarProducto = (datos) => {
    const errores = [];

    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
        return ["El cuerpo de la petición debe ser un objeto JSON"];
    }

    if (typeof datos.nombre !== "string" || !datos.nombre.trim()) {
        errores.push("El nombre es obligatorio");
    } else if (datos.nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    } else if (datos.nombre.trim().length > 100) {
        errores.push("El nombre no puede exceder 100 caracteres");
    }

    if (!CATEGORIAS_VALIDAS.includes(datos.categoria)) {
        errores.push(`Categoría inválida. Debe ser una de: ${CATEGORIAS_VALIDAS.join(", ")}`);
    }

    if (!datos.subcategoria) {
        errores.push("La subcategoría es obligatoria");
    } else if (datos.categoria && SUBCATEGORIAS_VALIDAS[datos.categoria] && !SUBCATEGORIAS_VALIDAS[datos.categoria].includes(datos.subcategoria)) {
        errores.push(`Subcategoría inválida para ${datos.categoria}. Opciones: ${SUBCATEGORIAS_VALIDAS[datos.categoria].join(", ")}`);
    }

    if (!RAREZAS_VALIDAS.includes(datos.rareza)) {
        errores.push(`Rareza inválida. Debe ser una de: ${RAREZAS_VALIDAS.join(", ")}`);
    }

    if (datos.precio === undefined || datos.precio === null || datos.precio === "") {
        errores.push("El precio es obligatorio");
    } else {
        const precioNum = Number(datos.precio);

        if (!Number.isFinite(precioNum)) {
            errores.push("El precio debe ser un número válido");
        } else if (precioNum <= 0) {
            errores.push("El precio debe ser mayor que cero");
        } else if (precioNum > 100000) {
            errores.push("El precio no puede exceder 100,000");
        }
    }

    if (datos.descripcion !== undefined && typeof datos.descripcion !== "string") {
        errores.push("La descripción debe ser texto");
    } else if (typeof datos.descripcion === "string" && datos.descripcion.length > 500) {
        errores.push("La descripción no puede exceder 500 caracteres");
    }

    if (datos.imagen !== undefined && datos.imagen !== "") {
        if (typeof datos.imagen !== "string") {
            errores.push("La imagen debe ser una URL en texto");
        } else {
            try {
                const url = new URL(datos.imagen);
                if (!["http:", "https:"].includes(url.protocol)) {
                    errores.push("La imagen debe usar una URL HTTP o HTTPS válida");
                }
            } catch {
                errores.push("La imagen debe ser una URL HTTP o HTTPS válida");
            }
        }
    }

    return errores;
};

export const obtenerCategorias = () => [...CATEGORIAS_VALIDAS];
export const obtenerSubcategorias = (categoria) => [...(SUBCATEGORIAS_VALIDAS[categoria] || [])];
export const obtenerRarezas = () => [...RAREZAS_VALIDAS];
