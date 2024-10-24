const express = require("express")
const { getPosts, addPost, editPost, deletePost, getPost } = require("../controllers/posts.controllers")
const router = express.Router()

router.get("/api/posts", async (req, res) => await getPosts(req, res))
router.post("/api/posts", async (req, res) => await addPost(req, res))
router.put("/api/posts/:postId", async (req, res) => await editPost(req, res))
router.delete("/api/posts/:postId", async (req, res) => await deletePost(req, res))
router.get("/api/posts/:postId", async (req, res) => await getPost(req, res))

module.exports = router