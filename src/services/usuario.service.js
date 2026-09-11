import { obtenerTodos } from "../repositories/usuario.repository.js";

export const listarUsuarios = async () => obtenerTodos();
