const express = require("express");
const { verificaToken, verificaAdmin_Role } = require("../middlewares/autenticacion");

let app = express();
let Producto = require("../models/producto_model");
const { populate } = require("../models/producto_model");

// OBTENER PRODUCTOS
// -------------------------------------------------
app.get("/productos", [verificaToken], (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate("usuario", "usuario nombre")
    .populate("categoria", "descripcion")
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        productos,
      });
    });
});

// OBTENER UN PRODUCTO POR ID
// -------------------------------------------------
app.get("/productos/:id", [verificaToken], (req, res) => {
  let id = req.params.id;

  Producto.findById(id)
    .populate("Usuario", "nombre email")
    .populate("categoria", "nombre")
    .exec((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!productoDB) {
        return res.status(500).json({
          ok: false,
          err: {
            message: "El ID no existe",
          },
        });
      }

      res.status(201).json({
        ok: true,
        producto: productoDB,
      });
    });
});

// CREAR UN PRODUCTO NUEVO
// -------------------------------------------------
app.post("/productos", [verificaToken], (req, res) => {
  let body = req.body;
  let producto = new Producto({
    usuario: req.usuario._id,
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
  });

  producto.save((err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      producto: productoDB,
    });
  });
});




// BUSCAR PRODUCTOS
// -------------------------------------------------
app.put("/productos/buscar/:termino", [verificaToken], (req, res) => {

    let termino = req.params.termino;

let regex = new RegExp(termino, "i");
console.log(regex)


    Producto.find({nombre: regex})
    .populate("categoria","nombre")
    .exec((err, productos)=>{
        if (err) {
            return res.status(500).json({
              ok: false,
              err,
            });
          }


          res.json({
            ok: true,
            producto: productos,
          });
    })



});

// ACTUALIZAR UN PRODUCTO
// -------------------------------------------------

app.put("/productos/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
  let id = req.params.id;
  let body = req.body;

  // Valida si existe el elemento en la BD y lo obtiene
  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!productoDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "El ID no existe",
        },
      });
    }

    productoDB.nombre = body.nombre;
    productoDB.precioUni = body.precioUni;
    productoDB.categoria = body.categoria;
    productoDB.disponible = body.disponible;
    productoDB.descripcion = body.descripcion;

    productoDB.save((err, productoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        producto: productoGuardado,
      });
    });
  });
});

// DESHABILITAR UN PRODUCTO POR ID
// -------------------------------------------------

app.delete("/productos/:id", [verificaToken], (req, res) => {
  let id = req.params.id;

  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!productoDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "El ID no existe",
        },
      });
    }

    productoDB.disponible = false;

    productoDB.save((err, productoBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        producto: productoBorrado,
      });
    });
  });
});
module.exports = app;
