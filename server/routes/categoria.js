const express = require("express");
const { verificaToken, verificaAdmin_Role } = require("../middlewares/autenticacion");

let app = express();

let Categoria = require("../models/categoria_model");
const { json } = require("body-parser");

// MOSTRAR TODAS LAS CATEGORIAS
app.get("/categoria", verificaToken, (req, res) => {

  Categoria.find({})
  .sort("descripcion")
  .populate("usuario", "nombre email")
  .exec((err, categorias) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      categorias,
    });
  });
});

// // MOSTRAR CATEGORIA POR ID
app.get("/categoria/:id", (req, res) => {
  let id = req.params.id;

  Categoria.findById(id, (err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID no es correcto.",
        },
      });
    }

    res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});

// CREAR NUEVA CATEGORIA
app.post("/categoria/", [verificaToken, verificaAdmin_Role], (req, res) => {
  let body = req.body;
  let categoria = new Categoria({
    descripcion: body.descripcion,
    usuario: req.usuario._id,
  });
  categoria.save((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      categoriaDB,
    });
  });
});

// MODIFICAR UNA CATEGORIA POR ID
app.put("/categoria/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
  let id = req.params.id;
  let body = req.body;

  let descCategoria = {
    descripcion: body.descripcion,
  };
  Categoria.findByIdAndUpdate(
    id,
    descCategoria,
    { new: true, runValidators: true, context: "query" },
    (err, categoriaDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!categoriaDB) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        categoriaDB,
      });
    }
  );
});

// ELIMINAR CATEGORIA POR ID
app.delete("/categoria/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
  let id = req.params.id;

  Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El id no existe",
        },
      });
    }

    res.json({
      ok: true,
      message: "Categoria borrada",
    });
  });
});

module.exports = app;
