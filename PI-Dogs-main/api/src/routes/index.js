const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const {Dog, Temperamento} = require("../db")

const dogsRoute = require("../routes/dogs");
const temperamentosRoute = require("../routes/temperamentos");


const {API_KEY} = process.env
const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs",dogsRoute)
router.use("/temperamentos",temperamentosRoute)


const getApiInfo= async ()=>{
    const apiUrl = await axios.get(url);
    const apiInfo = await apiUrl.data.map(el=>{
        return {
            name:el.name,
            id:el.id,
            height:el.height.metric,
            weight:el.weight.metric,
            life_span:el.life_span,
            image:el.image.url
        }
    })
    return apiInfo
}


const getBsInfo = async ()=>{
    return await Dog.findAll({
        include:{
            model:Temperamento,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
}

const getAllDogs = async ()=>{
    const infoApi = await getApiInfo();
    const infoBs = await getBsInfo();
    const infoTotal = infoApi.concat(infoBs)
    return infoTotal;
}





module.exports = router;

