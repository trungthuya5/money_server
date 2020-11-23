

class Group {
    constructor(data) {
        this.userId = data.userId;
        this.groupId = data.groupId;
        this.name = data.name;
        this.type = data.type;
    }

    static Instance = ()=>{
        return new Group()
    }

    create = (data, result) => {
        sql.query("INSERT INTO groups SET ?", data, (err, res) => {
            if (err) {
                console.log(err);
                result(err, null);
                return;
            }

            result(null, { groupId: res.insertId, ...data })
        })
    }

    findById = (data, result) => {
        sql.query(`SELECT * FROM groups WHERE userId=${data.userId} AND groupId=${data.groupId}`, (err, res) => {
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
        sql.query(`SELECT * FROM groups WHERE userId=${data.userId}`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            result(null, res)
        })
    }

    updateById = (data, result) => {
        let {userId, groupId, data} = data;
        sql.query(`UPDATE groups SET name='${data.name}' WHERE userId=${userId} AND groupId=${groupId}`,
            (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }

                result(null, { groupId: data.groupId, ...data.device });
            }
        );
    };

    remove = (data, result) => {
        sql.query(`DELETE FROM groups WHERE userId=${data.userId} AND groupId=${data.groupId}`, (err, res) => {
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
        sql.query(`DELETE FROM groups WHERE userId=${data.userId}`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            result(null, res);
        });
    };

}
module.exports = Groups;