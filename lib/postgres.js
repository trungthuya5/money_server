const mysql = require("mysql");
const dbConfig = require('./../configs/db');



var connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

class DB {

    sql = null;

    constructor() {
        this.connect()
    }

    static Instance() {
        return new DB()
    }

    connect() {
        this.sql = mysql.createPool({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        });
    }

    selectAll(table_name) {
        return this.sql.query(`SELECT * FROM ${table_name}`);
    }

    selectOne(table_name, column, where) {
        return this.sql.query(`select `)
    }

    getColumn(column) {
        let res = "";
        column.forEach(item => {
            res += item + ", ";
        });
        return res;
    }

    async getWhere(where) {
        let str = "WHERE ";
        await Object.keys(where).forEach(key => {
            str += key + "=" + where[key] + ", ";
        });
        str = await str.substring(0,str.length-1)
        return str
    }
}
module.exports = DB;