const {Pickup, sequelize} = require('../models');
const {QueryTypes} = require('sequelize');

/** 
 * 
*/

exports.getAll = async(req,res,next)=>{
    try {
        const data = await sequelize.query('SELECT * FROM Pickups',{type: QueryTypes.SELECT })


        if (!data.length) {
            return next({code:404, message:'Data not found'});

        }else{
            res.status(200).json({
                stauts: 'success',
                data
            })
        }
    } catch (error) {
        next({code: 500, message: error.message || 'internal server error'})
    }


}

exports.pickup = async(req,res,next)=>{
    try {
        let{name, namaPenerima, from, to, address, lat1,lng1, lat2,lng2, namaDriver} = req.body;

        // const newData = {
        //     nama,
        //     namaPenerima,
        //     from,
        //     to,
        //     address,
        //     lat1,
        //     lng1,
        //     lat2,
        //     lng2,
        // }

        // let data = await sequelize.query('INSERT INTO Pickups SET ?',{type:QueryTypes.INSERT})
        //     // if (err) {
        //     //    return next({code: 404, message: 'not found'})
        //     // }else{
        //     //     res.status(200).json({
        //     //         status: 'sukses',
        //     //         data
        //     //     })
        //     // }

        // if(err){
        //     return next({code: 404, message: 'data tidak ada'})
        // }else{
        //     res.status(200).json({
        //         status: 'sukses',
        //         data
        //     })
        // }
        let newData = {
            name:name,
            namaPenerima:namaPenerima,
            from:from,
            to:to,
            address:address,
            lat1:lat1,
            lng1:lng1,
            lat2:lat2,
            lng2:lng2,
            namaDriver:namaDriver,
            status:"online"
        }
        let data = await Pickup.create(newData)

        res.status(201).json({
            status:'success added',
            data
        })
    } catch (error) {
        next({code: 500, message: error.message || 'Internal server error'})
    }
}

exports.getOrder= async(req,res,next)=>{
    try {
        let {name, namaPenerima, from, to, address, lat1, lng1, lat2,lng2, namaDriver, status} = req.body;

        let data = await Pickup.findOne({
            where:{
                id:req.params.id
            }
        });

        if (!data) {
            return next({code:400, message: 'data cant reacher'})
        }
        data.name = name || data.name;
        data.namaPenerima = namaPenerima || data.namaPenerima;
        data.from = from || data.from;
        data.to = to || data.to;
        data.address =address || data.address;
        data.lat1=lat1 || data.lat1;
        data.lng1 = lng1 || data.lng1;
        data.lat2 = lat2 || data.lat2;
        data.lng2 = lng2 || data.lng2;
        data.namaDriver = namaDriver || data.namaDriver;
        data.status = status || data.status;
        await data.save();
        res.status(200).json({
            status: 'success',
            data
        })
        console.log(data.json)
    } catch (error) {
        next({code:500, message: error.message || 'Internal Server Error'})
    }
}