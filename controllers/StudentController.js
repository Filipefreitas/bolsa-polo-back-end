const express = require('express')
const router = express.Router()
const studentService = require("../services/StudentService.js");

//cria um aluno
router.post("/", studentService.createAStudent);

//lista de todos os alunos
router.get("/", studentService.getStudents);

//retorna aluno especifico baseado no ID do aluno
router.get("/:id", studentService.getAStudent);

//Associa voucher a um determinado aluno
router.patch("/:id", studentService.linkVoucherToStudent);

module.exports = router