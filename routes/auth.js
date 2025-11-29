const express = require("express");
const router = express.Router();
const User = require("../shared/models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({
      username,
      email,
      password
    });

    res.json({ message: "Usuario registrado", user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en login" });
  }
});


module.exports = router;
