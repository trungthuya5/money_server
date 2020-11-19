const {sql} = require('./lib/index')

    //let a = new sql()


//console.log(sql.getColumn(["a","asd","asd"]));
console.log();
sql.getWhere({a:"a","bbb":"b"}).then(console.log)
