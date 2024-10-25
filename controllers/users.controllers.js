const connection = require("../config/db/db")


const getUsers = async (req, res) => {
    const query = `
        SELECT  u.id as id,
                u.nama as nama,
                u.email as email,
                u.createdAt as createdAt
        FROM users as u
    `
    connection.query(query, (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        res.status(200).json({
            message: "Success get users",
            data: rows
        })
    })
}

const getUser = async (req, res) => {
    const userId = req.params.userId
    const query = `
        SELECT  u.id as id,
                u.nama as nama,
                u.email as email,
                u.createdAt as createdAt
        FROM users as u
        WHERE id = ${userId}
    `
    connection.query(query, (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        if(!rows[0]) {
            res.status(200).json({
                message: "User not found",
            })
        }
        res.status(200).json({
            message: "Success get user",
            data: rows[0]
        })
    })
}

const editUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = {
    getUsers,
    getUser,
    editUser,
    deleteUser
}