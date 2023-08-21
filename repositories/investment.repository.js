const {Op, INTEGER} = require('sequelize');
const investmentRepository = require('../bin/database').DB.Investment;
const initRepository = require('../bin/database').DB.InitModels;
const {sequelize} = require("../bin/database");

async function getAll(req,res){
    initRepository.investment.findAll({
        include: [{
            as: 'investment_option',
            model: sequelize.model('investment_option')},
            {as: 'status',
                model: sequelize.model('status') }]
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "error at retrieving all"
        })
    })
}
async function createInvestment(req,res){
    try{
        const obj =req.body;
        console.log(JSON.stringify(obj))
        const newInvestment = await initRepository.investment.create(obj);
        res.status(201).json(newInvestment);
    }
    catch (err){
        console.error(err);
        res.status(500).json({error: 'error at creating'});
    }
}
async function getById(req,res){
    const id = req.params.id;
    await initRepository.investment.findByPk(id, {
        include: [{
            as: 'investment_option',
            model: sequelize.model('investment_option')},
            {as: 'status',
            model: sequelize.model('status') }]
    })
        .then(data=>{
            if(data){
                res.send(data)
            }else{
                res.status(404).send({
                    message:`Cant find investment with id ${id}`
                });
            }
        }).catch(err=>{
            console.log(err)
        res.status(500).send({
            message: "Error at retrieving investment with id="+id
        });
    });
}
async function getByStatus(req, res){
    let id = req.params.status;
    await initRepository.investment.findAll({
        include: {
            as: 'investment_option',
            model: sequelize.model('investment_option')},
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
    await initRepository.investment.update(req.body,{
        where: {id:id}
    })
        .then(num => {
            if (num){
                res.send({
                    message: "investment updated"
                });
            }else{
                res.send({
                    message: `Cant find investment with id ${id}`
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

    initRepository.investment.destroy({
        where: {id: id}
    }).then(num => {
        if (num != null && !isNaN(num)){
            res.send({
                message: "investment deleted :("
            });
        }else{
            res.send({
                message: "couldn't find investment with id="+id
            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "problem at trying to delete investment"
        });
    });
}
module.exports = {investmentRepository: investmentRepository,
    createInvestment,
    getAll,
    getById,
    getByStatus,
    updateById,
    deleteById
};