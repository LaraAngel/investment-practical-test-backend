const {Op,Sequelize} = require('sequelize');
const userRepository = require('../bin/database').DB.User;

async function getAll(req,res){
    userRepository.findAll().then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "error at retrieving all"
        })
    })
}
async function createUser(req,res){
    try{
        const { name } =req.body;
        const newUser = await userRepository.create({name});
        res.status(201).json(newUser);
    }
    catch (err){
        console.error(err);
        res.status(500).json({error: 'error at creating'});
    }
}
async function getById(req,res){
    const id = req.params.id;
    await userRepository.findByPk(id, {include: [models.Status] })
        .then(data=>{
            if(data){
                res.send(data)
            }else{
                res.status(404).send({
                    message:`Cant find user with id ${id}`
                });
            }
        }).catch(err=>{
        res.status(500).send({
            message: "Error at retrieving user with id="+id
        });
    });
}
async function getByName(req,res){
    let name = req.params.name;
    userRepository.findAll({
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
    userRepository.update(req.body,{
        where: {id:id}
    })
        .then(num => {
            if (num => id){
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

    userRepository.destroy({
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
    getByName,
    updateById,
    deleteById
};