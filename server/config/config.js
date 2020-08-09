// ===================================
//  PUERTO
// ===================================
process.env.PORT = process.env.PORT || 3000;

// ===================================
//  ENTORNO
// ===================================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ===================================
//  BASE DE DATOS
// ===================================
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
}else{
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;




// ===================================
//  VENCIMIENTO DE TOKEN
// ===================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30  






// ===================================
//  SEMILLA
// ===================================
process.env.SEMILLA =  process.env.SEMILLA || "ESTE_ES_EL_SEED_DE_DESARROLLO"



// ===================================
//  GOOGLE CLIENT ID
// ===================================
process.env.CLIENT_ID = process.env.CLIENT_ID || "566143651759-d06s2m7ksfp5m9fe4sbslhslc06fp2f9.apps.googleusercontent.com"
