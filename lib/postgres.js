const Pool = require('pg').Pool
//const dbConfig = require('./../configs/db');



// var connection = mysql.createPool({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });

class DB {

    sql = null;

    constructor() {
        this.connect()
    }

    static Instance() {
        return new DB()
    }

    connect() {
        this.sql = new Pool({
            user: 'plqbpfuuccchba',
            host: 'ec2-107-20-185-16.compute-1.amazonaws.com',
            database: 'd6qao2790ub54l',
            password: '379c4b11d81a38e4496c93e9ac3983e115dcfd732351e758c4c3ee398dace10f',
            port: 5432,
        })
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
        str = await str.substring(0, str.length - 1)
        return str
    }
}
module.exports = DB;