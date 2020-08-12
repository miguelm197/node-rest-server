const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

const Usuario = require("../models/usuario_model");
const Producto = require("../models/producto_model")
const fs = require("fs");
const path = require("path");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.put("/uploads/:tipo/:id", function (req, res) {
  let tipo = req.params.tipo;
  let id = req.params.id;

  // VAlidar tipo
  let tiposValidos = ["productos", "usuarios"];
  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Los tipos permitidos son " + tiposValidos.join(", "),
      },
    });
  }

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "No se ha seleccionado ningún archivo.",
      },
    });
  }

  let archivo = req.files.archivo;

  // Extensiones permitidas
  let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

  let nombreCortado = archivo.name.split(".");
  let extension = nombreCortado[nombreCortado.length - 1];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Las extensiones permitidas son " + extensionesValidas.join(", "),
        ext: extension,
      },
    });
  }

  // Cambiar nombre al archivo
  let nombreArchivo = `${id}-${new Date().getTime()}.${extension}`;

  archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
    if (err)
      return res.status(500).json({
        ok: false,
        err,
      });


      if(tipo === "usuarios"){
        
        imagenUsuario(id, res, nombreArchivo);
      }else{
        imagenProducto(id, res, nombreArchivo);

      }


  });
});

function imagenUsuario(id, res, nombreArchivo) {
  Usuario.findById(id, (err, usuarioDB) => {
    if (err) {

    borraArchivo(nombreArchivo,"usuarios");



      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No existe el usuario",
        },
      });
    }
    borraArchivo(usuarioDB.img,"usuarios");

    usuarioDB.img = nombreArchivo;

    usuarioDB.save((err, usuarioGuardado) => {
      res.json({
        ok: true,
        usuario: usuarioGuardado,
        img: nombreArchivo,
      });
    });
  });
}

function imagenProducto(id, res, nombreArchivo) {

  Producto.findById(id, (err, productoDB) => {
    if (err) {

    borraArchivo(nombreArchivo,"productos");



      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No existe el producto",
        },
      });
    }
    borraArchivo(productoDB.img,"productos");

    productoDB.img = nombreArchivo;

    productoDB.save((err, productoGuardado) => {
      res.json({
        ok: true,
        usuario: productoGuardado,
        img: nombreArchivo,
      });
    });
  });

}

function borraArchivo(nombreImagen, tipo){
  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
  if (fs.existsSync(pathImagen)) {
    fs.unlinkSync(pathImagen);
  }
}

module.exports = app;
