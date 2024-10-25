const connection = require("../config/db")
const { stringToObject } = require("../utils/utils")

const getPosts = async (req, res) => {
    const query = `
        SELECT  p.id as id,
                p.title as title,
                p.content as content,
                p.createdAt as createdAt,
                u.id as userId,
                u.nama as nama
        FROM posts AS p
        LEFT JOIN users AS u ON p.userId = u.id
    `
    connection.query(query, async (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        const transformRows = rows.map((row) => {
            const {userId, nama, ...dataPost} = row
            return {
                ...dataPost,
                user: {
                    userId,
                    nama
                }
            }
        }) 
        res.status(200).json({
            message: "Success get all post",
            data: transformRows
        })
    })
}

const addPost = async (req, res) => {
    const { userId, title, content } = req.body
    
    if(!userId || !title || !content) {
        return res.status(400).json({
            message: "All field is required"
        })
    }
    connection.query("SELECT * FROM users WHERE id = ?", [userId], (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        if(!rows[0]) {
            return res.status(400).json({
                message: "UserID invalid"
            })
        }
        connection.query("INSERT INTO posts (userId, title, content) VALUES(?, ?, ?)", [userId, title, content], (err, rows) => {
            if(err) {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
            res.status(201).json({
                message: "Success added new post"
            })
        })
    })

}

const getPost = async (req, res) => {
    const postId = req.params.postId
    const query = `
        SELECT  p.id as id,
                p.title as title,
                p.content as content,
                p.createdAt as createdAt,
                u.id as userId,
                u.nama as nama
        FROM posts AS p
        LEFT JOIN users AS u ON p.userId = u.id
        WHERE p.id = ${postId}
    `
    connection.query(query, async (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        if(!rows[0]) {
            return res.status(400).json({
                message: "Post not found"
            })
        }
        const transformRow = rows.map((row) => {
            const {userId, nama, ...dataPost} = row
            return {
                ...dataPost,
                user: {
                    userId,
                    nama
                }
            }
        }) 
        res.status(200).json({
            message: "Success get post",
            data: transformRow
        })
    })
}

const editPost = async (req, res) => {
    const { userId } = req.query
    const { postId } = req.params
    const { title, content } = req.body
    if(!title || !content) {
        return res.status(400).json({
            message: "All field is required"
        })
    }
    const query = `
        UPDATE posts
        SET title = '${title}', content = '${content}'
        WHERE id = ${postId} AND userId = ${userId}
    `
    connection.query(query, (err, row) => {
        if(err) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        const info = stringToObject(row.info)
        if(info.Rowsmatched === 0) {
            return res.status(400).json({
                message: "userId or id has incorrect"
            })
        }
        if(row.changedRows === 0) {
            return res.status(200).json({
                message: "Request has successful, but no content were updated"
            })
        }
        res.status(200).json({
            message: "Post has updated"
        })
    })
}

const deletePost = async (req, res) => {
    const postId = req.params.postId
    const query = `
        DELETE FROM posts WHERE id = ${postId}
    `
    connection.query(query, (err, row) => {
        if(row.affectedRows === 0) {
            return res.status(400).json({
                message: "Post not found"
            })
        }
        if(!row) {
            return res.status(400).json({
                message: "Post not found"
            })
        }
        if(err) {
            console.log(err)
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        res.status(200).json({
            message: "Post has deleted"
        })
    })
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    editPost,
    deletePost
}