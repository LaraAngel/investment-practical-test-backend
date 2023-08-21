const express = require('express');
const router= express.Router();
const repository = require('../repositories/investmentOption.repository');

router.post('/', async (req,res)=> {
    await repository.createInvestmentOption(req,res);
})

router.get('/', async (req, res) =>{
    await repository.getAll(req,res);
});

router.get('/:id', async(req,res)=> {
    await repository.getById(req, res);
});

router.get("/name/:name", async(req,res)=>{
    await repository.getByName(req,res);
});

router.put('/:id', async(req,res)=> {
    await repository.updateById(req, res);
});

router.delete('/:id', async(req,res)=> {
    await repository.deleteById(req, res);
});

module.exports = router;