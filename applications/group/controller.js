const Group = require('./index').Model

exports.create = (req, res) => {
    if (!req.body) {
        res.json({ error: 1001 })
    }

    const group = new Group({
        userId: req.userId,
        groupId: req.bosy.groupId,
        walletId = req.body.walletId,
        typeId = req.body.typeId,
        name = req.body.name,
        note = req.body.note,
    })

    Group.create(group, (err, data) => {
        if (err) res.json({ error: 1002 })
        else res.json({ error: 0, data: data })
    })
}

exports.findAll = (req, res) => {

    Group.getAll({userId:req.userId}, (err, data) => {
        if (err) res.json({ error: 1002 })
        else res.json({ error: 0, data: data })
    })
}

exports.findOne = (req, res) => {
    Group.findById({userId:req.userId, groupId: req.params.id }, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.json({ error: 1003 })
            } else {
                res.json({ error: 1002 })
            }
        } else res.json({ error: 0, data: data })
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.json({ error: 1001 })
    }

    Group.updateById({userId:req.userId,groupId: req.params.id,data : new Group(req.body)},
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

exports.delete = (req, res) => {
    Group.remove({userId:req.userId,groupId:req.params.id}, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.json({ error: 1003 })
            } else {
                res.json({ error: 1002 })
            }
        } else res.json({ error: 0 })
    });
};

exports.deleteAll = (req, res) => {
    Group.removeAll({userId:req.userId},(err, data) => {
        if (err) res.json({ error: 1002 })
        else res.json({ error: 0 })
    });
};