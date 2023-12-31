import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usuariosService from "../services/usuarios.service.js";

const jwtToken = process.env.JWTSECRET;

export const login = (req, res) => {
  const { email, password } = req.body;
  usuariosService
    .getUsuarioByEmail(email)
    .then(async (resolve) => {
      if (resolve[0][0].length == 0) {
        return res.status(400).json({
          message: "email o password incorrecto",
        });
      }
      const passwordCorrecto = bcrypt.compareSync(
        password,
        resolve[0][0].password
      );
      if (!passwordCorrecto) {
        return res.status(400).json({
          message: "email o password incorrecto",
        });
      }
      const payload = await {
        usuario: {
          id: resolve[0][0].id_usuario,
          nombre: resolve[0][0].nombre,
        },
      };
      const token = jwt.sign(payload, jwtToken, { expiresIn: "1h" });

      res.status(200).json({
        message: "acceso correcto",
        token,
        usuario: {
          id: resolve[0][0].id_usuario,
          nombre: resolve[0][0].nombre,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "ocurrió un error al validar credenciales",
        error: err.message,
      });
    });
};
