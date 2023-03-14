const mysql = require('mysql');
const fs = require('fs');
const db = require('../config/db')

var config =
{
    host: 'myserver-ps.mysql.database.azure.com',
    user: 'manan@myserver-ps',
    password: 'Nagarro@123',
    database: 'world',
};

const conn = new mysql.createConnection(config);



class Post {
    constructor(rollno, name, date, marks) {
        this.rollno = rollno;
        this.name = name;
        this.date = date;
        this.marks = marks;
    }
    static findAll() {
        let data = "hello"
        conn.query('SELECT * FROM studentdetails',
            function (err, results) {
                if (err) throw err;
                else console.log('Selected ' + results.length + ' row(s).');
                // console.log(results)
                var arr = [];

                for (let i = 0; i < results.length; i++) {
                    arr[i] = JSON.stringify(results[i])
                    data = data + JSON.stringify(results[i])


                }

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = JSON.parse(arr[i]);
                }

                return arr


            })
        console.log(data)
    }
    static findByRollNo(rollno, name) {
        let sql = `SELECT * FROM studentdetails WHERE rollno =${rollno} and name='${name}';`
        return conn.query(sql)
    }
    static findByRollNoOnly(rollno) {
        let sql = `SELECT * FROM studentdetails WHERE rollno =${rollno} ;`
        return conn.query(sql)
    }
    static save(rollno, name, date, marks) {
        let sql = `insert into studentdetails value(${rollno},'${name}','${date}',${marks});`
        return conn.query(sql)
    }
    static edit(rollno, name, date, marks) {
        let sql = `UPDATE studentdetails SET name='${name}',date='${date}',marks=${marks} WHERE rollno=${rollno};`
        return conn.query(sql)
    }
    static delete(rollno) {
        let sql = `delete from studentdetails where rollno=${rollno};`
        return conn.query(sql)
    }
}
module.exports = Post;