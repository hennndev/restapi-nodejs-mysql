const express = require("express")
const { getUsers, getUser, editUser, deleteUser } = require("../controllers/users.controllers")
const router = express.Router()

router.get("/api/users", async (req, res) => await getUsers(req, res))
router.get("/api/users/:userId", async (req, res) => await getUser(req, res))
router.put("/api/users/:userId", async (req, res) => await editUser(req, res))
router.delete("/api/users/:userId", async (req, res) => await deleteUser(req, res))

module.exports = router