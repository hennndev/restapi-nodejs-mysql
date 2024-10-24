const express = require("express")
const { login, register } = require("../controllers/auth.controllers")
const router = express.Router()

router.post("/api/auth/login", async (req, res) => await login(req, res))
router.post("/api/auth/register", async (req, res) => await register(req, res))

module.exports = router