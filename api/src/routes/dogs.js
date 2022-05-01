const { Router } = require('express');
const { Dog, Temperament } = require('../db.js');
const router = Router();
const axios = require('axios');
const { Op } = require("sequelize");

const { URL_APIKEY } = process.env;



router.get('/', async(req, res) => {
    let { name } = req.query;

    if(name){
        try {
            let apiData = await axios.get(URL_APIKEY);

            let filteredApiData = apiData.data.filter(d => d.name.toLowerCase().includes(`${name}`.toLowerCase()));
            const finalApiData = filteredApiData.map(d => ({
                name: d.name,
                weight: d.weight.metric,
                image: d.image.url,
                id: d.id,
                temperaments: d.temperament
            }));
            let dbData = (await Dog.findAll({
                where: {name:{
                    [Op.iLike]: `%${name}%`
                }},
                // attributes:[
                //     "name",
                //     "weight",
                //     "image", 
                //     "id"                      
                // ],
                include: {
                    model: Temperament,
                    attributes: ["temperaments"],
                    through: { attributes: [] },
                }})).map(p => {
                return {   
                    id: p.id,                 
                    name: p.name,
                    weight: p.weight,
                    image: p.image,
                    temperaments: p.Temperaments.map(t => t.temperaments).toString()
                    }
                }
            )
            console.log(dbData)
            let apiDbData = dbData.concat(finalApiData);

            if(apiDbData.length === 0) {
                return res.json([{
                    name: 'The breed does not exist',
                    image: 'https://media.istockphoto.com/vectors/prohibition-sign-stop-dog-simple-icon-label-vector-id956788966?s=612x612',
                    temperaments: 'No temperaments aviable',
                    weight: 'No weight aviable' 
                }])
            } else {
                return res.json(apiDbData);
            }
        }
        catch (error){
            res.send(error);
        }
    }
    else {
        let apiData = [];
        let dbData = [];
        try{
         apiData = await axios.get(URL_APIKEY)
         apiData = apiData.data.map(d => ({
            name: d.name,
            weight: d.weight.metric,
            image: d.image.url,
            id: d.id,
            temperaments: d.temperament
        }))
        dbData = (await Dog.findAll({
            // attributes:[
            //     "name",
            //     "weight",
            //     "image", 
            //     "id"       
            // ],
            include: {
                model: Temperament,
                attributes: ["temperaments",'id'],
                through: { attributes: []},
            }
        }))
        .map(d => {
            console.log(d.temperaments)
            return {
                id: d.id,
                image: d.image,
                name: d.name,
                weight: d.weight,
                temperaments: d.Temperaments.map(t => t.temperaments).toString()
            }
        })
        console.log(dbData)
        const result = apiData.concat(dbData);
        res.json(result)
    }
    catch(error) {
        console.log(error)
        // res.status(404).send(error);
    }
    }
})


router.get('/:idBreed', async(req, res) => {
    const id = req.params.idBreed;

    if(id < 264) {
        try{
            const apiBreeds = await axios.get(URL_APIKEY);
            const idApiDog = apiBreeds.data.filter(d => d.id === Number(id));
            if(idApiDog.length === 0) res.send('id not found');
            const detailApiDog = idApiDog.map(d => ({
                name: d.name,
                height: d.height.metric,
                weight: d.weight.metric,
                life_span: d.life_span,
                image: d.image.url,
                id: d.id,
                temperaments: d.temperament
            }))
            res.json(detailApiDog[0]);
        }
        catch(error){
            res.send(404);
        }
    } else {
        try {
            const idDb = await Dog.findByPk(id);
            let temps = await idDb.getTemperaments();
               
            idDb
            ? res.json({
                id: idDb.id,
                name: idDb.name,
                weight: idDb.weight,
                height: idDb.height,
                life_span: idDb.life_span,
                image: idDb.image,
                temperaments: temps.map(t => t.temperaments).toString()
            })
            : res.send('id not found');
        }
        catch(error){
            res.send(404);
        }
    }


})


module.exports = router;