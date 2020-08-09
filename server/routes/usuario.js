const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario_model");
const { verificaToken, verificaAdmin_Role } = require("../middlewares/autenticacion");
const app = express();

// USUARIO
// -------------------------------------------------
app.get("/usuario", verificaToken, (req, res) => {
  let desde = Number(req.query.desde) || 0;
  let limite = Number(req.query.limite) || 5;

  Usuario.find({ estado: true }, "nombre email role estado google img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.count({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo,
        });
      });
    });
});

app.post("/usuario", [verificaToken, verificaAdmin_Role], (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

app.put("/usuario/:id", [verificaToken, verificaAdmin_Role], function (req, res) {
  let id = req.params.id;

  // Solo toma en cuenta los parámetros en el arreglo
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: "query" }, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({ ok: true, usuario: usuarioDB });
  });
});

app.delete("/usuario/:id", [verificaToken, verificaAdmin_Role], function (req, res) {
  let id = req.params.id;

  let cambiaEstado = {
    estado: false,
  };
  Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    if (!usuarioDB) {
      res.json({
        ok: true,
        err: {
          message: "Usuario no encontrado",
        },
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});
// -------------------------------------------------

module.exports = app;
