const connection = require("../config/db/db")
const bcrypt = require("bcryptjs")

const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(400).json({
            message: "All field is required"
        })
    }
    connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, rows) => {
        if(rows.length === 0) {
            return res.status(400).json({
                message: "User not found"
            })
        } 
        const user = rows[0]
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) {
            return res.status(400).json({
                message: "Password Incorrect"
            })
        } else {
            return res.status(200).json({
                message: "Success login",
                data: user
            })
        }
    }) 
}

const register = async (req, res) => {
    const { nama, email, password } = req.body
    if(!nama || !email || !password) {
        return res.status(400).json({
            message: "All field is required"
        })
    }
    connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, rows) => {
        console.log(rows)
        if(rows[0]) {
            return res.status(400).json({
                message: "Email already used"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        connection.query("INSERT INTO users (nama, email, password) VALUES (?, ?, ?)", [nama, email, hashPassword], (err, rows) => {
            console.log(err)
            res.status(201).json({
                message: "Success create new user"
            })
        })
    })

}

module.exports = {
    login, register
}