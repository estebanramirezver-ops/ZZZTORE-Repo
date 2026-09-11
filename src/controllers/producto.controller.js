import { listarProductos, buscarProducto, registrarProducto } from "../services/producto.service.js";

const responderError = (res, error) => {
    const status = error.status || 500;

    return res.status(status).json({
        success: false,
        error: status === 400 ? "Datos inválidos" : status === 404 ? "No encontrado" : "Error interno del servidor",
        mensaje: error.message || "Ocurrió un error inesperado",
        detalles: error.detalles || null
    });
};

export const getProductos = async (req, res) => {
    try {
        const productos = await listarProductos();

        return res.json({
            success: true,
            data: productos,
            total: productos.length
        });
    } catch (error) {
        return responderError(res, error);
    }
};

export const getProductoPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            const error = new Error("El ID debe ser un número entero positivo");
            error.status = 400;
            return responderError(res, error);
        }

        const producto = await buscarProducto(id);

        return res.json({
            success: true,
            data: producto
        });
    } catch (error) {
        return responderError(res, error);
    }
};

export const postProducto = async (req, res) => {
    try {
        const nuevoProducto = await registrarProducto(req.body);

        return res.status(201).json({
            success: true,
            data: nuevoProducto,
            mensaje: "Producto creado exitosamente"
        });
    } catch (error) {
        return responderError(res, error);
    }
};
