import { Router } from "express";
import productosRouter from "./productos.route.js";
import pedidosRouter from "./pedidos.route.js";
import usuariosRouter from "./usuarios.route.js";

const indexRouter = Router();
const prefijo = "/api";

indexRouter.get(prefijo, (req, res) => {
  res.send("Bienvenido a mi API").status(200);
});

indexRouter.use(`${prefijo}/productos`, productosRouter);
indexRouter.use(`${prefijo}/pedidos`, pedidosRouter);
indexRouter.use(`${prefijo}/usuarios`, usuariosRouter);

export default indexRouter;