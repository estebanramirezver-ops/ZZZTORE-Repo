import { listarUsuarios } from "../services/usuario.service.js";

export const getUsuarios = async (req, res) => {
    const usuarios = await listarUsuarios();
    return res.json(usuarios);
};
