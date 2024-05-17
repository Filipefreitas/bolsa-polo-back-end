const StudentModel = require("../models/Student.js");

exports.createAStudent = (req,res)=>{
    const student = new StudentModel(req.body);
    student.save()
    .then((newStudent)=>{
        res.json({
            message: "Aluno foi criado com sucesso e está salvo na coleção",
            data: newStudent
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};

exports.getStudents = (req, res)=>{

    StudentModel.find()
    .then(students=>{
        res.json({
            message: "lista de todos os alunos cadastrados",
            data: students,
            totalStudents: students.length
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};

exports.getAStudent = async (req, res)=> {
    StudentModel.findOne({cdRa: {$eq: req.params.id}}).populate("studentVouchers")
    .then(student=>{
        if(student)
        {
            res.json({
                student: `Aluno com o cdRa ${req.params.id}`,
                data: student,
                totalVouchers: student.studentVouchers.length
            })
        }
        else
        {
            res.status(404).json({
                message: `Náo há aluno cadastrado com o ra ${req.params.id}`
            })
        }   
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};

exports.linkVoucherToStudent = (req, res)=>{
    StudentModel.findOneAndUpdate(
        {cdRa: {$eq: req.params.id}}, 
        {$push: {studentVouchers: req.body.studentVouchers}}, 
        {new: true})
    .then(student=>{
        if(student)
        {
            res.json({
                message: `Aluno com o cd_ra ${req.params.id} foi atualizado`,
                data: student
            })
        }
        else
        {
            res.status(404).json({
                message: `Náo há aluno cadastrado com o cd_ra ${req.params.id}`
            })
        }   
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};