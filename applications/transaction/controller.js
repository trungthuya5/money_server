const Transaction = require('./index').Model


class tranController extends Transaction {

    constructor() {
        super()
    }

    add(req, res) {
        if (!req.body) {
            res.json({ error: 1001 })
        }

        const tran = new Transaction({
            userId: req.userId,
            walletId : req.body.walletId,
            typeId : req.body.typeId,
            name : req.body.name,
            note : req.body.note,
        })

        this.create(tran, (err, data) => {
            if (err) res.json({ error: 1002 })
            else res.json({ error: 0, data: data })
        })
    }

    findAll(req, res) {

        this.getAll({ userId: req.userId }, (err, data) => {
            if (err) res.json({ error: 1002 })
            else res.json({ error: 0, data: data })
        })
    }

    findOne(req, res) {
        this.findById({ userId: req.userId, tranId: req.params.id }, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.json({ error: 1003 })
                } else {
                    res.json({ error: 1002 })
                }
            } else res.json({ error: 0, data: data })
        });
    };

    update(req, res) {
        if (!req.body) {
            res.json({ error: 1001 })
        }

        this.updateById({ userId: req.userId, tranId: req.params.id, data: new Group(req.body) },
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.json({ error: 1003 })
                    } else {
                        res.json({ error: 1002 })
                    }
                } else res.json({ error: 0, data: data })
            }
        );
    };

    delete(req, res) {
        this.remove({ userId: req.userId, tranId: req.params.id }, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.json({ error: 1003 })
                } else {
                    res.json({ error: 1002 })
                }
            } else res.json({ error: 0 })
        });
    };

    deleteAll(req, res) {
        this.removeAll({ userId: req.userId }, (err, data) => {
            if (err) res.json({ error: 1002 })
            else res.json({ error: 0 })
        });
    };
}

tranController = tranController;