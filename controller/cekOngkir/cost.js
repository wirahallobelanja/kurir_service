const axios = require('axios');
const request = require('request-promise')

exports.cost = async (req, res, next) => {
    res.setHeader('Accept', 'application/json')
    res.setHeader('Content-Type', 'application/json')
  
    const { from, to, weight, courier } = req.body
    const data = await request.post({
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: { key:'ebac183c434202f1cbf3f0154a8f07e6' },
      form: { origin: from, destination: to, weight: weight * 1000, courier }
    })
  
    if (err) {
      return res.status(500).json({
          message: 'internal server error'
      })
    }else{
        return res.status(200).json({
            method: req.method,
            status: res.statusCode,
            data: JSON.parse(data)
          })
    }
  }