const { Router } = require('express');
const { Dog, Temperament } = require('../db.js');
const router = Router();
const axios = require('axios');
const { Op } = require("sequelize");

const apiKey = 'a4f84332f2144e2db97da55f31f95df0';



router.get('/', async(req, res) => {
    let { name } = req.query;

    if(name){
        try {
            let apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);

            let filteredApiData = apiData.data.filter(d => d.name.toLowerCase().includes(`${name}`.toLowerCase()));
            // console.log(filteredApiData);
            let dbData = await Dog.findAll({
                where: {name:{
                    [Op.iLike]: `%${name}%`
                }},
                include: {
                    model: Temperament,
                    attributes: ["nameTemp"],
                    through: { attributes: [] },
                }
            });
            
            let apiDbData = dbData.concat(filteredApiData);

            if(apiDbData.length === 0) {
                return res.send('The breed does not exist')
            } else {
                const breeds = apiDbData.map(d => ({
                    name: d.name,
                    height: d.height.metric,
                    weight: d.weight.metric,
                    life_span: d.life_span,
                    image: d.image.url,
                    id: d.id,
                    temperament: d.temperament
                }));
                return res.json(breeds);
            }
        }
        catch (error){
            res.send(error);
        }
    }
    else {
        res.send('You must to input a breed');
    }
})

router.get('/', async(req, res) => {
    let apiData = [];
    let dbData = [];
    try{
     apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`)
     apiData = apiData.data.map(d => ({
        name: d.name,
        weight: d.weight.metric,
        image: d.image.url,
        id: d.id,
        temperaments: d.temperament
    }))
    dbData = await Dog.findAll({
        attributes:[
            "name",
            "weight",
            "image", 
            "id"       
        ],
        include: [{
            model: Temperament,
            attributes: ["nameTemp"],
            through: { attributes: [] },
        }]
    })
    const result = apiData.concat(dbData);
    res.json(result)
}
catch(error) {
    res.status(404).send(error);
}
})



router.get('/:idBreed', async(req, res) => {
    const id = req.params.idBreed;

    if(id < 264) {
        try{
            const apiBreeds = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
            const idApiDog = apiBreeds.data.filter(d => d.id === Number(id));
            if(idApiDog.length === 0) res.send('id not found');
            const detailApiDog = idApiDog.map(d => ({
                name: d.name,
                height: d.height.metric,
                weight: d.weight.metric,
                life_span: d.life_span,
                image: d.image.url,
                id: d.id,
                temperament: d.temperament
            }))
            res.send(detailApiDog);
        }
        catch(error){
            res.send(404);
        }
    } else {
        try {
            const idDb = await Dog.findByPk(id);
            idDb
            ? res.send(idDb)
            : res.send('id not found');
        }
        catch(error){
            res.send(404);
        }
    }


})


module.exports = router;