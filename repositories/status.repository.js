const {Op} = require('sequelize');
const statusRepository = require('../bin/database').DB.Status;
const initModels = require('../models/init-models')
const {sequelize} = require("../bin/database");
const models = initModels(sequelize)
async function getAll(req,res){
    models.status.findAll().then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "error at retrieving all"
        })
    })
}
async function createStatus(req,res){
    try{
        const  status  = req.body;
        const newStatus = await models.status.create(status);
        res.status(201).json(newStatus);
    }
    catch (err){
        console.error(err);
        res.status(500).json({error: 'error at creating'});
    }
}
async function getById(req,res){
    const id = req.params.id;
    models.status.findByPk(id)
        .then(data=>{
            if(data){
                res.send(data)
            }else{
                res.status(404).send({
                    message:`Cant find status with id ${id}`
                });
            }
        }).catch(err=>{
            res.status(500).send({
                message: "Error at retrieving status with id="+id
            });
    });
}
async function getByName(req,res){
    let name = req.params.name;
    models.status.findAll({
        where: { name: {
            [Op.like]: `%${name}%`
            }}
    })
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
    models.status.update(req.body,{
        where: {id:id}
    })
        .then(num => {
            if (num => id){
                res.send({
                    message: "status updated"
                });
            }else{
                res.send({
                    message: `Cant find status with id ${id}`
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

    models.status.destroy({
      where: {id: id}
    }).then(num => {
        if (num != null && !isNaN(num)){
            res.send({
                message: "status deleted :("
            });
        }else{
            res.send({
                message: "couldn't find status with id="+id
            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "problem at trying to delete status"
        });
    });
}
module.exports = {statusRepository: statusRepository,
    createStatus,
    getAll,
    getById,
    getByName,
    updateById,
    deleteById
};