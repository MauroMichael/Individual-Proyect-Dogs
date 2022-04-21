const { default: axios } = require('axios');
const { Router } = require('express');
const { Temperament } = require('../db.js');
const router = Router();
const apiKey = 'a4f84332f2144e2db97da55f31f95df0';



router.get('/', async(req, res) => {
    let apiTemps = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);

    let existApiTemps = apiTemps.data.filter(d => d.temperament !== undefined);
    let onlyApiTemps = existApiTemps.map(d => d.temperament.split(',')).flat();
    await Temperament.bulkCreate([...new Set(onlyApiTemps)].map(t => ({
        nameTemp: t
    })));
    res.json('genial')

})

module.exports = router;