const userModel = require("../models/User");
const roleModel = require('../models/Role')

exports.validateUser = async (req, res, next)=>{
    //console.log(`The request body: ${JSON.stringify(req.body)}`)
    
    let errors = {};
    let hasErrors = false;
    const minLengthName = 3;
    const maxLengthName = 16;
    const minLengthUserName = 3;
    const maxLengthUserName = 20;
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minLengthPass = 6;
    const maxLengthPass = 20;
    let roleExists  = "";
    const user = new userModel(req.body);

    //start with async operations
    try{
        const existingUser = await userModel.findOne({userName:req.body.userName});
        if (existingUser){
            hasErrors = true;
            errors["userNameErr"] = "Já existe um usuário com esse nome"
        }

        const existingEmail = await userModel.findOne({email:req.body.email});
        if (existingEmail){
            hasErrors = true;
            errors["emailErr"] = "Já existe um usuário associado a esse email"
        }
        
        // role validation
        if (req.body.role) {
            roleExists = await roleModel.findOne({name: req.body.role});
            if (!roleExists) {
                hasErrors = true;
                errors["roleErr"] = "Perfil selecionado inválido ou inexistente";
            }
        } 
        else {
            hasErrors = true;
            errors["roleErr"] = "Selecione um perfil";
        }
    }
    catch (error) {
        console.error('Error checking email existence:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //firstName validations
    if(user.firstName === undefined || user.firstName.length < `${minLengthName}` || user.firstName.length > `${maxLengthName}`){
        hasErrors = true;
        errors["firstNameErr"] = `Nome deve ter entre ${minLengthName} e ${maxLengthName} caracteres`
    }

    //lastName validations
    else if(user.lastName == undefined || user.lastName.length < `${minLengthName}` || user.lastName.length > `${maxLengthName}`){
        hasErrors = true;
        errors["lastNameErr"] = `Sobrenome deve ter entre ${minLengthName} e ${maxLengthName} caracteres`
    }

    //userName validation
    else if(user.userName.length === 0 || user.userName.length < `${minLengthUserName}` || user.userName.length > `${maxLengthUserName}`){
        hasErrors = true;
        errors["userNameErr"] = `Nome usuário deve ter entre ${minLengthUserName} e ${maxLengthUserName} caracteres`
    }

    else if(user.email.length === 0 || !checkEmail.test(user.email)){
        hasErrors = true;
        errors["emailErr"] = `Informe um email válido`
    }
                
    //password validation
    else if(user.password.length === 0 || user.password.length < minLengthPass || user.password.length > maxLengthPass){
        hasErrors = true;       
        errors["passwordErr"] = `A senha deve ter entre ${minLengthPass} e ${maxLengthPass} caracteres`
    }

    if(hasErrors) {
        console.log(errors);
        return res.status(400).json({errors});
    }
    else
    {
        req.role = roleExists._id;
        console.log(req.role)
        next();
    }
}   