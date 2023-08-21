const {Op} = require('sequelize');
const investmentOptionRepository = require('../bin/database').DB.InvestmentOption;

async function getAll(req,res){
    investmentOptionRepository.findAll().then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "error at retrieving all"
        })
    })
}
async function createInvestmentOption(req,res){
    try{
        const { name } =req.body;
        const newInvestmentOption = await investmentOptionRepository.create({name});
        res.status(201).json(newInvestmentOption);
    }
    catch (err){
        console.error(err);
        res.status(500).json({error: 'error at creating'});
    }
}
async function getById(req,res){
    const id = req.params.id;
    investmentOptionRepository.findByPk(id)
        .then(data=>{
            if(data){
                res.send(data)
            }else{
                res.status(404).send({
                    message:`Cant find investmentOption with id ${id}`
                });
            }
        }).catch(err=>{
        res.status(500).send({
            message: "Error at retrieving investmentOption with id="+id
        });
    });
}
async function getByName(req,res){
    let name = req.params.name;
    investmentOptionRepository.findAll({
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
    investmentOptionRepository.update(req.body,{
        where: {id:id}
    })
        .then(num => {
            if (num => id){
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

    investmentOptionRepository.destroy({
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
    getByName,
    updateById,
    deleteById
};