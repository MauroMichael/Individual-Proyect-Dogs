const { default: axios } = require('axios');
const { Router } = require('express');
const { Temperament } = require('../db.js');
const router = Router();
const { URL_APIKEY } = process.env;


    router.get('/', async(req, res) => {
        const allTempDb = await Temperament.findAll();
        if (allTempDb.length > 1) return res.json(allTempDb);
        let apiTemps = await axios.get(URL_APIKEY);
        let existApiTemps = apiTemps.data.filter(d => d.temperament !== undefined);
        let onlyApiTemps = existApiTemps.map(d => d.temperament.split(', ')).flat()
   
    const finalTemps = await Temperament.bulkCreate([...new Set(onlyApiTemps)].map(t => ({
        temperaments: t
    })));
    return res.json(finalTemps)

})

module.exports = router;