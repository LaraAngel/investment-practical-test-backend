const {Op, INTEGER} = require('sequelize');
const userRepository = require('../bin/database').DB.User;
const initModels = require('../models/init-models');
const {sequelize} = require("../bin/database");
const models = initModels(sequelize);

async function getAll(req,res){
    models.user.findAll({
        include: [{
            as: 'status',
            model: sequelize.model('status')
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
        const newUser = await models.user.create(obj);
        res.status(201).json(newUser);
    }
    catch (err){
        console.error(err);
        res.status(500).json({error: 'error at creating'});
    }
}
async function getById(req,res){
    const id = req.params.id;
    await models.user.findByPk(id, {
        include:
            [{as: 'status',
                model: sequelize.model('status') }]
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

async function validateWithEmail(req, res){
    let a;
}

async function getByStatus(req, res){
    let id = req.params.status;
    await models.user.findAll({
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
    models.user.update(req.body,{
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

    models.user.destroy({
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
    getAll,
    getById,
    getByStatus,
    updateById,
    deleteById,
    validateWithEmail
};