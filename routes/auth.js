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

module.exports = router;
