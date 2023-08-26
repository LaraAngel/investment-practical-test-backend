const {Op} = require('sequelize');
const userRepository = require('../bin/database').DB.User;
const initModels = require('../models/init-models');
const {sequelize} = require("../bin/database");
const models = initModels(sequelize);
const User = models.user;
//login
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


async function getAll(req,res){
    User.findAll({
        include: [{
            as: 'status',
            model: models.status
        }]
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "error at retrieving all"
        })
    })
}
async function createUser(req,res){
    try{
        const obj =req.body;
        console.log(JSON.stringify(obj))
        const newUser = await User.create(obj);
        res.status(201).json(newUser);
    }
    catch (err){
        console.error(err);
        res.status(500).json({error: 'error at creating'});
    }
}
async function getById(req,res){
    const id = req.params.id;
    await User.findByPk(id, {
        include:
            [{as: 'status',
                model: models.status }]
    })
        .then(data=>{
            if(data){
                res.send(data)
            }else{
                res.status(404).send({
                    message:`Cant find user with id ${id}`
                });
            }
        }).catch(err=>{
            console.log(err)
            res.status(500).send({
                message: "Error at retrieving user with id="+id
            });
        });
}

async function loginEmail(req, res){
    const user = await User.findOne({where: {email: req.body.email}});
    if (user){
        const validLogin = await user.validPassword(req.body.password);
        // const validLogin = await bcrypt.compare(req.body.password, user.password);
        if (validLogin){
            token = jwt.sign({
                "id": user.id,
                "balance": user.balance,
                "birthday": user.birthday,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "status_id": user.status_id,
            },process.env.SECRET);
            res.status(200).json({token:token})
        }else{
            res.status(400).json({ error: "Wrong pass"});
        }
    }else{
        res.status(404).json({ error: "Invalid user"})
    }
}

async function getByStatus(req, res){
    let id = req.params.status;
    await User.findAll({
        where: { status_id: parseInt(id) }}
    )
        .then(data=>{
            res.send(data);
        }).catch(err=>{
            res.status(500).send({
                message:
                    err.message || "error at getting by name"
            })
        })
}
async function updateById(req,res){
    const id = req.params.id;
    req.body.id = id;
    User.update(req.body,{
        where: {id:id}
    })
        .then(num => {
            if (num){
                res.send({
                    message: "user updated"
                });
            }else{
                res.send({
                    message: `Cant find user with id ${id}`
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: "error at updating"
            });
        });
}
async function deleteById(req,res){
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    }).then(num => {
        if (num != null && !isNaN(num)){
            res.send({
                message: "user deleted :("
            });
        }else{
            res.send({
                message: "couldn't find user with id="+id
            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "problem at trying to delete user"
        });
    });
}
module.exports = {userRepository: userRepository,
    createUser,
    loginEmail,
    getAll,
    getById,
    getByStatus,
    updateById,
    deleteById
};