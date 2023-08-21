const {Op} = require('sequelize');
const userInvestmentsRepository = require('../bin/database').DB.UserInvestments;

async function getAll(req,res){
    userInvestmentsRepository.findAll().then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "error at retrieving all"
        })
    })
}
async function createUserInvestments(req,res){
    try{
        const { name } =req.body;
        const newUserInvestment = await userInvestmentsRepository.create({name});
        res.status(201).json(newUserInvestment);
    }
    catch (err){
        console.error(err);
        res.status(500).json({error: 'error at creating'});
    }
}
async function getById(req,res){
    const id = req.params.id;
    userInvestmentsRepository.findByPk(id)
        .then(data=>{
            if(data){
                res.send(data)
            }else{
                res.status(404).send({
                    message:`Cant find userInvestment with id ${id}`
                });
            }
        }).catch(err=>{
        res.status(500).send({
            message: "Error at retrieving userInvestment with id="+id
        });
    });
}
async function getByName(req,res){
    let name = req.params.name;
    userInvestmentsRepository.findAll({
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
    userInvestmentsRepository.update(req.body,{
        where: {id:id}
    })
        .then(num => {
            if (num => id){
                res.send({
                    message: "userInvestment updated"
                });
            }else{
                res.send({
                    message: `Cant find userInvestment with id ${id}`
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

    userInvestmentsRepository.destroy({
        where: {id: id}
    }).then(num => {
        if (num != null && !isNaN(num)){
            res.send({
                message: "userInvestment deleted :("
            });
        }else{
            res.send({
                message: "couldn't find userInvestment with id="+id
            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "problem at trying to delete userInvestment"
        });
    });
}
module.exports = {userInvestmentsRepository: userInvestmentsRepository,
    createUserInvestments,
    getAll,
    getById,
    getByName,
    updateById,
    deleteById
};