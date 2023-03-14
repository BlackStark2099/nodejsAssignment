const mysql = require('mssql');
const fs = require('fs');
const Post = require('../modals/studentdettails')

var config =
{
    Driver: 'msodbcsql13',
    Server: 'tcp:database-server-ps.database.windows.net',
    Database: 'DatabasePS',
    Uid: 'manan',
    Pwd: 'Nagarro@123',
    //port: 3306,
    //ssl: { ca: fs.readFileSync("your_path_to_ca_cert_file_BaltimoreCyberTrustRoot.crt.pem") }
};

const conn = new mysql.createConnection(config);



conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
            queryDatabase();
            readData();


        }
    });

function queryDatabase() {
    conn.query('DROP TABLE IF EXISTS studentdetails;', function (err, results, fields) {
        if (err) throw err;
        console.log('Dropped studentdetails table if existed.');
    })
    conn.query('CREATE TABLE studentdetails (rollno INTEGER PRIMARY KEY, name VARCHAR(50), date	varchar(20), marks	INTEGER);',
        function (err, results, fields) {
            if (err) throw err;
            console.log('Created studentdetails table.');
        })
    conn.query('INSERT INTO studentdetails (rollno, name, date, marks) VALUES (?, ?, ?, ?);', [1, 'Ajay', '2000-09-09', 78],
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    conn.query('INSERT INTO studentdetails (rollno, name, date, marks) VALUES (?, ?, ?, ?);', [31, 'GAjay', '2000-09-09', 78],
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Inserted ' + results.affectedRows + ' row(s).');
        })

        ;


};

function readData() {
    conn.query('SELECT * FROM studentdetails',
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            console.log(results)
            // for (i = 0; i < results.length; i++) {
            //     console.log('Row: ' + JSON.stringify(results[i]));
            // }
            var arr = [];

            for (let i = 0; i < results.length; i++) {
                arr[i] = JSON.stringify(results[i])
            }

            for (let i = 0; i < arr.length; i++) {
                arr[i] = JSON.parse(arr[i]);
            }

            return arr;
        });
};

function updateData() {
    conn.query('UPDATE studentdetails SET quantity = ? WHERE name = ?', [200, 'banana'],
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Updated ' + results.affectedRows + ' row(s).');
        });
};

function deleteData() {
    conn.query('DELETE FROM studentdetails WHERE name = ?', ['orange'],
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Deleted ' + results.affectedRows + ' row(s).');
        });
};

module.exports = conn;