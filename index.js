require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const { sequelize } = require('./config/database');

// CORS PERMITIR FRONTEND 5173
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// IMPORTAR MODELOS
require('./shared/models/User');

// Rutas
app.use('/api', require('./routes/auth'));

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL establecida.");

    await sequelize.sync();
    console.log("Tablas sincronizadas.");

    app.listen(process.env.PORT || 3001, () => {
      console.log("Servidor iniciado en puerto", process.env.PORT);
    });

  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
}

startServer();
