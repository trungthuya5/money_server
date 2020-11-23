const sql = require('../../lib/index').db.Instance().sql

class Transaction {

    constructor(){}

    constructor(data) {
        this.tranId = data.tranId;
        this.userId = data.userId;
        this.walletId = data.walletId;
        this.typeId = data.typeId;
        this.name = data.name;
        this.note = data.note;
    }

    create = (data, result) => {
        sql.query("INSERT INTO transactions SET ?", data, (err, res) => {
            if (err) {
                console.log(err);
                result(err, null);
                return;
            }

            result(null, { tranId: res.insertId, ...data })
        })
    }

    findById = (data, result) => {
        sql.query(`SELECT * FROM transactions WHERE userId=${data.userId} AND tranId=${data.tranId}`, (err, res) => {
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

    getAll = (data, result) => {
        console.log(data);
        sql.query(`SELECT * FROM transactions WHERE userId=${data.userId}`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            result(null, res)
        })
    }

    updateById = (data, result) => {
        let {userId, tranId, data} = data;
        sql.query(`UPDATE transactions SET name='${data.name}' WHERE userId=${userId} AND tranId=${tranId}`,
            (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }

                result(null, { tranId: data.tranId, ...data.device });
            }
        );
    };

    remove = (data, result) => {
        sql.query(`DELETE FROM transactions WHERE userId=${data.userId} AND tranId=${data.tranId}`, (err, res) => {
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

    removeAll = (data, result) => {
        sql.query(`DELETE FROM transactions WHERE userId=${data.userId}`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            result(null, res);
        });
    };

}
module.exports = Transaction;