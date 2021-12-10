const axios = require('axios');
const { response } = require('../../app');

exports.all_cities = (req,res, next)=>{
    axios.get('https://api.rajaongkir.com/starter/city', {
        headers:{
            'key': "ebac183c434202f1cbf3f0154a8f07e6"
        }
    }).then(response=>{
        res.json(response.data.rajaongkir.result);
    }).catch(err=>{
        console.log(err)
    })
}

exports.city = (req,res,next)=>{
    if(req.params.id == 0){
        next({code:404, message:"Invalid City"});
    }
    axios.get('https://api.rajaongkir.com/starter/city?id='+ req.params.id, {
        headers:{
            'key': "ebac183c434202f1cbf3f0154a8f07e6"
        }
    }).then(response => {
        console.log(response.data.rajaongkir);
        res.status(200).send(response.data.rajaongkir.results);
      }).catch(err => {
        console.log(err);
      });
}