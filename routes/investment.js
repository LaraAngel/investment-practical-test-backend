const express = require('express');
const router= express.Router();
const repository = require('../repositories/investment.repository');

router.post('/', async (req,res)=> {
    await repository.createInvestment(req,res);
})

router.get('/', async (req, res) =>{
    await repository.getAll(req,res);
});

router.get('/:id', async(req,res)=> {
    await repository.getById(req, res);
});

router.get("/status/:status", async(req,res)=>{
    await repository.getByStatus(req,res);
});

router.put('/:id', async(req,res)=> {
    await repository.updateById(req, res);
});

router.delete('/:id', async(req,res)=> {
    await repository.deleteById(req, res);
});

module.exports = router;