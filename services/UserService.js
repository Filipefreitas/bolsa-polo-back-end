const userModel = require("../models/User.js");
const bcrypt = require('bcryptjs');

exports.createAUser = (req, res)=> {
    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        role: req.role,
        password: req.body.password
    });
    
    newUser.save()
    .then((newUser)=>{
        // console.log("14 Success")
        res.status(200).json({
            message: "User successfully created"
            , data: newUser
        })
    })
    .catch(errors=>{
        // console.log("15 Eror")
        res.status(400).json({
            message: errors
        })
    })
};

exports.loginUser = (req, res)=> {    
    const userName = req.body.username
    const password = req.body.password

    userModel.findOne({userName: {$eq: userName}}).populate({ path: 'role', model: 'Role', populate: { path: 'permissions', model: 'Permission' }})
    .then(user =>{
        if (user) {
            bcrypt.compare(password, user.password)
            .then(isMatched=>{
                if(isMatched){
                    if(user.isActive){
                        res.status(200).json({success: true, message: 'Username exists, is active, and password is correct', userName: user.userName, userRole: user.role.name, userPermissions: user.role.permissions});
                    }
                    else{
                        res.status(401).json({success: false, message: 'Usuário inativo. Contate o administrador'});
                    }
                }
                else{   
                    res.status(401).json({success: false, message: 'Usuário ou senha inválidos'});
                }
            })
          } 
          else { 
            res.status(401).json({success: false, message: 'Usuário ou senha inválidos'});
          }
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};

exports.getUsers = (req,res)=>{
    userModel.find().populate({ path: 'role', model: 'Role', populate: { path: 'permissions', model: 'Permission' }})
    .then(users=>{
        res.json({
            message: "A list of all users"
            , data: users
            , totalUsers: users.length
        })
    })
    .catch(err => {
        console.error('Error fetching users with roles and permissions:', err);
        res.status(500).json({
          message: err.message
        });
      });
};

exports.getAUser = (req,res)=>{
    userModel.findById(req.params.id)
    .then(user=>{
        if(user)
        {
            res.json({
                message: `user with the id ${req.params.id}`
                , data: user
            })
        }
        else
        {
            res.status(404).json({
                message: `There is no user in our database with the id ${req.params.id}`
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};

exports.updateAUser = (req,res)=>{
    userModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(user=>{
        if(user)
        {
            res.json({
                message: `user with the id ${req.params.id} was successfully updated`
                , data: user
            })
        }
        else
        {
            res.status(404).json({
                message: `There is no user in our database with the id ${req.params.id}`
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};

exports.deleteAUser = (req,res)=>{
    userModel.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.json({
            message: `user with the id ${req.params.id} was successfully deleted`
        })
    })        
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};