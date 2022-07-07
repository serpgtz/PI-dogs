const { Router} = require("express")
const { Dog, Temperamento } = require("../db")
const axios = require("axios");

const router = Router();

const {API_KEY} = process.env
const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`



const getApiInfo= async ()=>{
    const apiUrl = await axios.get(url);
    const apiInfo = await apiUrl.data.map(el=>{
        return {
            name:el.name,
            id:el.id,
            height:el.height.metric,
            weight:el.weight.metric,
            life_span:el.life_span,
            image:el.image.url,
            temperament: el.temperament
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







router.get("/", async (req, res)=>{
    const {name}=req.query

    try {
        let dogsTotal = await getAllDogs();
        if(name){
       
            try {
                let dogName= dogsTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
                console.log(dogName)
                res.send(dogName.length? dogName: "no hay coincidencias")
            } catch (error) {
                console.log(error)
            }
        }
        res.send(dogsTotal.length? dogsTotal: "no hay dogs")
    } catch (error) {
        console.log(error)
    }
   
})

router.get("/:id", async(req,res)=>{

    const { id }= req.params
    
    try {
    const allDogs= await getAllDogs()
   
    const dogId = allDogs.filter(el=>el.id==id)
    console.log(dogId)
    
        if(dogId.length){
           
            res.status(200).json(dogId)
        }
        else{
            res.send("no existe esa raza")
        }
    } catch (error) {
        console.log(error)
    }
})


router.post("/" ,async(req,res)=>{
  try {
    const {name, height, weight, life_span,temperamento } = req.body
   //temperamento=["Docile"," Faithful"]

    const raza= await Dog.create({
        name,
        height,
        weight,
        life_span
    })

    temperamento.forEach(async element => {
        const tempBd= await Temperamento.findAll({
            where:{name:element}
        })
        console.log(tempBd)
        raza.addTemperamento(tempBd)
        
    });
    return res.json(raza)
  } catch (error) {
    console.log(error)
  }
   
})











module.exports = router;

