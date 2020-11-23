const {db} = require('./lib/index')
const a = require('./applications/transaction/index').Model

    //let a = new sql()


//console.log(sql.getColumn(["a","asd","asd"]));
console.log(db.Instance().sql);
console.log(db.Instance().sql);


let b = new a();
console.log(b)
