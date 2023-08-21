const {Op, INTEGER} = require('sequelize');
const investmentOptionRepository = require('../bin/database').DB.InvestmentOption;
const initRepository = require('../bin/database').DB.InitModels;
const {sequelize} = require("../bin/database");

async function getAll(req,res){
    initRepository.investment_option.findAll({
        include:
            [{
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
async function createInvestmentOption(req,res){
    try{
        const obj =req.body;
        console.log(JSON.stringify(obj))
        const newInvestmentOption = await initRepository.investment_option.create(obj);
        res.status(201).json(newInvestmentOption);
    }
    catch (err){
        console.error(err);
        res.status(500).json({error: 'error at creating'});
    }
}
async function getById(req,res){
    const id = req.params.id;
    await initRepository.investment_option.findByPk(id, {
        include:
            [{
                as: 'status',
                model: sequelize.model('status')
            }]
    })
        .then(data=>{
            if(data){
                res.send(data)
            }else{
                res.status(404).send({
                    message:`Cant find investmentOption with id ${id}`
                });
            }
        }).catch(err=>{
            console.log(err)
            res.status(500).send({
                message: "Error at retrieving investmentOption with id="+id
            });
        });
}
async function getByStatus(req, res){
    let id = req.params.status;
    await initRepository.investment_option.findAll({
        where: { status_id: parseInt(id) }
    }
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
    await initRepository.investment_option.update(req.body,{
        where: {id:id}
    })
        .then(num => {
            if (num){
                res.send({
                    message: "investmentOption updated"
                });
            }else{
                res.send({
                    message: `Cant find investmentOption with id ${id}`
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

    initRepository.investment_option.destroy({
        where: {id: id}
    }).then(num => {
        if (num != null && !isNaN(num)){
            res.send({
                message: "investmentOption deleted :("
            });
        }else{
            res.send({
                message: "couldn't find investmentOption with id="+id
            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "problem at trying to delete investmentOption"
        });
    });
}
module.exports = {investmentOptionRepository: investmentOptionRepository,
    createInvestmentOption,
    getAll,
    getById,
    getByStatus,
    updateById,
    deleteById
};