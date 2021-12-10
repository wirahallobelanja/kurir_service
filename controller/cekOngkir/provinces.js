const axios = require('axios');

exports.all_provinces = async (req, res) => {
  await axios.get('https://api.rajaongkir.com/starter/province', {
    headers: {
      'key': "ebac183c434202f1cbf3f0154a8f07e6"
    }
  }).then(response => {
    res.json(response.data.rajaongkir.results);
  }).catch(err => {
    console.log(err);
  });
};

exports.province = async (req, res) => {

  if(req.params.id > 34 || req.params.id == 0) {
    res.status(404).json({message: 'there is no province'});
  }

  await axios.get('https://api.rajaongkir.com/starter/province?id=' + req.params.id, {
    headers: {
      'key': "ebac183c434202f1cbf3f0154a8f07e6"
    }
  }).then(response => {
    res.status(200).send(response.data.rajaongkir.results);

  }).catch(err => {
    console.log(err);
  });
};
