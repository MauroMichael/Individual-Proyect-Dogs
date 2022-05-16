const { Router } = require('express');
const { Dog, Temperament } = require('../db.js');
const router = Router();



let idBreed = 265;
router.post('/', async(req, res) => {
    const { name, height, weight, life_span, temperaments, image } = req.body;
    if(!name || !height || !weight) return res.send('Data incomplete').status(204)
    let existName = await Dog.findAll({
        where: {name: name},
    })
    if(existName.length !== 0)  return res.send('The breed already exist') 
    try {
        let newBreed = await Dog.create({
            name,
            height,
            weight,
            life_span,
            id: idBreed++,
            image

        })
        const temps = await Temperament.findAll({
            where: {
                id: temperaments
            }
        }
        );
        await newBreed.addTemperaments(temps)
        res.send('The breed has succesfully created');
    }
    catch ( error ) {
        console.log(error)
        res.status(404).send(error);
    }

})

module.exports = router;