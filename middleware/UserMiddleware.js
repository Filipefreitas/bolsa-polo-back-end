const userModel = require("../models/User");

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
    
    const user = new userModel(req.body);

    //start with async operations
    try{
        // console.log("0 not error")
        const existingUser = await userModel.findOne({userName:req.body.userName});
        if (existingUser){
            // console.log("1")
            hasErrors = true;
            errors["userNameErr"] = "Já existe um usuário com esse nome"
        }

        const existingEmail = await userModel.findOne({email:req.body.email});
        if (existingEmail){
            // console.log("2")
            hasErrors = true;
            errors["emailErr"] = "Já existe um usuário associado a esse email"
        }
    }
    catch (error) {
        console.error('Error checking email existence:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //firstName validations
    if(user.firstName === undefined || user.firstName.length < `${minLengthName}` || user.firstName.length > `${maxLengthName}`)
    {
        // console.log("3")
        hasErrors = true;
        errors["firstNameErr"] = `Nome deve ter entre ${minLengthName} e ${maxLengthName} caracteres`
    }

    //lastName validations
    else if(user.lastName == undefined || user.lastName.length < `${minLengthName}` || user.lastName.length > `${maxLengthName}`)
    {
        // console.log("4")
        hasErrors = true;
        errors["lastNameErr"] = `Sobrenome deve ter entre ${minLengthName} e ${maxLengthName} caracteres`
    }

    //userName validation
    else if(user.userName.length === 0 || user.userName.length < `${minLengthUserName}` || user.userName.length > `${maxLengthUserName}`)
    {
        // console.log("5")
        hasErrors = true;
        errors["userNameErr"] = `Nome usuário deve ter entre ${minLengthUserName} e ${maxLengthUserName} caracteres`
    }

    else if(user.email.length === 0 || !checkEmail.test(user.email))
    {
        // console.log("6")
        hasErrors = true;
        errors["emailErr"] = `Informe um email válido`
    }
        
    //role validation
    else if(user.role.length === 0)
    {
        // console.log("7")
        hasErrors = true;
        errors["roleErr"] = `Selecione um role`
    }
        
    //password validation
    else if(user.password.length === 0 || user.password.length < minLengthPass || user.password.length > maxLengthPass)
    {
        // console.log("8 not error")     
        hasErrors = true;       
        errors["passwordErr"] = `A senha deve ter entre ${minLengthPass} e ${maxLengthPass} caracteres`
    }

    if(hasErrors) 
    {
        console.log(errors);
        return res.status(400).json({errors});
    }
    else
    {
        next();
    }
}   