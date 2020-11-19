//username, password, fullname, email, phone, address, gender, birthday
const { sql } = require("./../../lib/index");
const md5 = require('md5');
const jwt = require('jsonwebtoken')

class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
        this.fullname = user.fullname;
    }

    login(data, result){
        sql.query(`SELECT * FROM users WHERE username='${data.username}' AND password='${md5(data.password)}'`, (err, res) => {
            if (err) {
                result(err, null)
                return
            }
    
            if (res.length) {
                let jwt_str = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12), data: { userId: res[0].userId, username: data.username } }, '9834534_auto_farm');
                result(null, jwt_str)
                return
            }
    
            result({ kind: "not_found" }, null);
        })
    }

    create = (newUser, result) => {
        sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
    
            result(null, { id: res.insertId, ...newUser })
        })
    }
    
    findById = (userId, result) => {
        sql.query(`SELECT * FROM users WHERE userId = ${userId}`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
    
            if (res.length) {
                result(null, res[0])
                return;
            }
    
            result({ kind: "not_found" }, null);
        })
    }
    
    getAll = result => {
        sql.query("SELECT * FROM users", (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
    
            result(null, res)
        })
    }
    
    updateById = (userId, user, result) => {
        sql.query(
            "UPDATE user SET username = ?, fullname = ?, email = ? WHERE userId = ?",
            [user.username, user.fullname, user.email, userId],
            (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
    
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
    
                result(null, { id: userId, ...user });
            }
        );
    };
    
    remove = (userId, result) => {
        sql.query("DELETE FROM users WHERE userId = ?", userId, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
    
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
    
            result(null, res);
        });
    };
    
    removeAll = result => {
        sql.query("DELETE FROM users", (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
    
            result(null, res);
        });
    };
}



module.exports = User;