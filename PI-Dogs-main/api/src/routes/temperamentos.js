const { Router} = require("express")
const { Temperamento, Dog} = require("../db")
const axios = require("axios")
const router = Router();


const {API_KEY} = process.env
const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
console.log(url)


router.get("/", async (req,res)=>{
  try {
    const infoApi= await axios.get(url)
    const info= infoApi.data.map(el=>el.temperament)
    const temperamentos = info.toString().split(",")

    temperamentos.forEach(element => {
        Temperamento.findOrCreate({
            where:{ name:element}
        })
    });

    const allTemperamentos = await Temperamento.findAll({
      include:{
        model:Dog,
        attributes: ["name", "image", "weight", "height", "life_span"],
        through: {
            attributes: []
        }
    }
    });
    
    res.send(allTemperamentos)
  } catch (error) {
    console.log(error)
  }
    
})

















module.exports = router;
