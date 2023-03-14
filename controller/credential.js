const Post = require('../modals/studentdettails')
const db = require('../config/db')


exports.getStudentById = async (req, res, next) => {
    try {
        let { rollno, name } = req.body
        let [stud, _] = await Post.findByRollNo(rollno, name);
        res.render('./studentinfo', { stud: stud[0] });

    } catch (error) {

        res.render('./error')
    }
}

exports.getStudents = async (req, res, next) => {
    try {
        let result = Post.findAll();
        console.log("in get students")
        console.log(result)
        // let [stud, _] = Post.findAll();
        console.log("printing stud" + result)
        res.render('./teachercredential', { stud: stud });
    } catch (error) {

        next(error);
    }
}

exports.addStudent = async (req, res, next) => {
    try {

        let { rollno, name, date, marks } = req.body
        console.log(rollno, name, date, marks);

        let [stud1, __] = await Post.save(rollno, name, date, marks);
        let [stud, _] = await Post.findAll();
        res.render('./teachercredential', { stud: stud });

    } catch (error) {

    }
}

exports.editStudent = async (req, res, next) => {
    try {
        let { rollno, name, date, marks } = req.body
        console.log(rollno, name, date, marks);


        let [stud1, __] = await Post.edit(rollno, name, date, marks);

        let [stud, _] = await Post.findAll();
        res.render('./teachercredential', { stud: stud });
    } catch (error) {

        res.render('error');
    }
}

exports.getStudentByGivenId = async (req, res, next) => {
    try {
        let { id } = req.params

        let [stud, _] = await Post.findByRollNoOnly(id);

        res.render('./edit', { stud1: stud[0] })
    } catch (error) {

        next(error);
    }
}

exports.deleteStudent = async (req, res, next) => {
    try {
        let { id } = req.params

        let [stud1, __] = await Post.delete(id);
        let [stud, _] = await Post.findAll();
        res.redirect('/teacher');
    } catch (error) {

        res.render('error');
    }
}