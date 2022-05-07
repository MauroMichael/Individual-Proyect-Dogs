const { Router } = require('express');
const { Dog, Temperament } = require('../db.js');
const router = Router();



let idBreed = 265;
router.post('/', async(req, res) => {
    const { name, height, weight, life_span, temperaments, image } = req.body;
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
        res.json(newBreed);
    }
    catch ( error ) {
        console.log(error)
        res.status(404).send(error);
    }

})

module.exports = router;