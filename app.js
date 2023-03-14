const express = require('express')
const cors = require('cors')
const app = express()
const bodyparser = require('body-parser')
const port = 8000

//Templating Engine
app.set('views', './views')
app.set('view engine', 'ejs')
var corsOptions = {
    origin: 'http://localhost:4200',
}
app.use(cors(corsOptions));

app.use(bodyparser.urlencoded({ extended: true }))
//Routes
const newsRouter = require('./routers/login')

const { getStudentById, getStudents, addStudent, editStudent, getStudentByGivenId, deleteStudent } = require('./controller/credential')
app.use('/', newsRouter);
app.get('/', function (req, res) {
    console.warn("JELO");
});
app.get('/student', function (req, res) {
    res.render('studentcredential')
})
app.get('/login', function (req, res) {
    res.render('login')
})
app.get('/teacher', getStudents)
app.post('/requirement', getStudentById)

app.get('/addStudent', function (req, res) {
    res.render('addStudent')
})
app.post('/add', addStudent)
// app.put('/edit',editStud);
app.get('/edit/:id', getStudentByGivenId, function (req, res) {

    let { id } = req.params;
    res.send(id)
})
app.get('/student/:id', getStudentByGivenId)
app.post('/editYourStudent', editStudent)
app.get('/delete/:id', deleteStudent)
//Listen on port 5000
app.listen(port, () => console.log(`Listening on Port ${port}`))

