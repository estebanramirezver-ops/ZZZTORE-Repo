import { Router } from "express";
import { getProductos, getProductoPorId, postProducto } from "../controllers/producto.controller.js";

const router = Router();

router.get("/", getProductos);
router.get("/:id", getProductoPorId);
router.post("/", postProducto);

export default router;