const {Markers, sequelize} = require('../models');
// const conn = require('../config/config');
const { DECIMAL } = require('mysql/lib/protocol/constants/types');
const {QueryTypes} = require('sequelize');

exports.getAll = async(req,ress,next)=>{
    try {
        const data = await sequelize.query('SELECT * FROM Markers',{
            type: QueryTypes.SELECT
        })
        //     {
        //         attributes:{
        //             exclude:['createdAt','updatedAt']
        //         }
        //     }
        // );

        if(!data.length){
            return next({code:404, message:'Not Found'})
        }
        ress.status(200).json({
            status:'success',
            data
        })
        console.log(data)
    } catch (error) {
        next({code:500, message: error.message || 'Internal Server Error'})
    }
}

exports.getDistance = async (req,res,next)=>{
    // let {lat,lng} = req.body;
    // let lat = req.body;
    // let lng = Number(req.body);
    // console.log(typeof lat);
    // let lat= -8.653098;
    // let lng = 115.217287;

    const mysql = require('mysql');

    // const conn = mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Hacker1234',
    //     database: 'distance'
    // });

    // let lat = parseFloat(req.body.lat);
    // let lng = parseFloat(req.body.lng);
    /**
     * -8.653098
     * 115.217287
     */
        try {
            let lat = parseFloat(req.body.lat);
            let lng = parseFloat(req.body.lng);
            const data = await sequelize.query(`SELECT * FROM (SELECT *, (((acos(sin(( ${lat} * pi()/180)) * sin((lat * pi()/180)) + cos(( ${lat} * pi()/180)) * cos((lat * pi()/180)) * cos((( ${lng} -lng)*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance FROM Markers) markers WHERE distance <=1 LIMIT 15`,{type:QueryTypes.SELECT},{attributes:['createdAt','updatedAt']}, (err,result)=>{

                if(!result.length){
                    return next({code:404, message:'Not Found'})
                }
                res.status(200).json({
                    status:'success',
                    data
                })
            })
            const jwtPayload = {
                latitude : data.id,
                longitude : data.name
            };
            res.status(200).json({
                status:'success',
                data
            })

            console.log(jwtPayload)

        } catch (error) {
            next({code:500, message: "Internal Server errror"})
        }
    //  conn.query(`SELECT * FROM (SELECT *, (((acos(sin(( ${lat} * pi()/180)) * sin((lat * pi()/180)) + cos(( ${lat} * pi()/180)) * cos((lat * pi()/180)) * cos((( ${lng} -lng)*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance FROM Markers) markers WHERE distance <=1 LIMIT 15`,{type: QueryTypes.SELECT}, (err, result)=>{
    //     //    console.log(query)
    //     console.log(result);
    //     console.log(lat);
    //     console.log(lng)
    //         if(err){
    //             next('Internal error');
    //         }else if(!result.length){
    //             console.log(result)
    //         }else{
    //             res.status(200).send({
    //                 message:'data sukses diambil',
    //                 result
    //             })
    //         }
    //     })
   
    // conn.query(`SELECT * FROM (
    //     SELECT *, ( ( ( Acos(Sin(( ${lat} * Pi() / 180 )) 
    //           * Sin((  map.lat* Pi() / 180 ))
    //           + Cos (( lat =${lat} * Pi() / 180 )) *
    //             Cos(( map.lat* Pi() / 180 )) *
    //             Cos  (((   ${lng} - map.lon ) * Pi() / 180 ))) )
    //            * 180 / Pi  ()   ) * 60 * 1.1515 * 1.609344 * 1000 ) 
    //                 AS METERS 
    //        FROM   base.map
    // ) resultset WHERE METERS <= 1`, (err, result)=>{
    //     if(err){
    //         next('Internal error')
    //     }else if(!result.length){
    //         next('data notfound');
    //     }else{
    //         res.status(200).send({
    //             message:'data sukses diambil',
    //             result
    //         })
    //     }
    // })

//    let q= `SELECT * FROM (
//         SELECT *, ( ( ( Acos(Sin(( ? * Pi() / 180 )) 
//               * Sin((  map.lat* Pi() / 180 ))
//               + Cos (( lat =? * Pi() / 180 )) *
//                 Cos(( map.lat* Pi() / 180 )) *
//                 Cos  (((   ? - map.lon ) * Pi() / 180 ))) )
//                * 180 / Pi  ()   ) * 60 * 1.1515 * 1.609344 * 1000 ) 
//                     AS METERS 
//            FROM   base.map
//     ) resultset WHERE METERS <= ?`

        // var d= (lat.lng)
}

exports.post = async(req,res,next)=>{
    try {
        let{lat,lng, name} = req.body;
        let data = await Markers.create({lat,lng,name})

        res.status(201).json({
            status:'success added',
            data
        })
    } catch (error) {
        next({code:500, message: error.message || 'Internal Server error'})
    }
}

exports.patch=async(req,res,next)=>{
    try {
        let {lat, lng, name} = req.body;

        let data = await Markers.findOne({
            where:{
                id:req.params.id
            }
        });

        if(!data){
            return next({code: 400, message: 'data not found, try another way'})
        }
        data.lat = lat ||data.lat;
        data.lng = lng || data.lng;
        data.name = name || data.name;

        await data.save();
        res.status(200).json({
            status: 'success',
            data
        })
        console.log(data.json)
    } catch (error) {
        next({code: 500, message: error.message || 'Internal server error!'})
    }
}

exports.delete = async(req,res,next)=>{
    try {
        const data = await Markers.findOne({where:{id:req.params.id}})
        if(!data){
            return next({code: 400, message: 'Data not Found'})
        }
        await data.destroy();
        res.status(204)
    } catch (error) {
        next({code: 500, message: error.message || 'Internal Server Error'})
    }
}


exports.getContactById = (req, res, next)=>{
    conn.query(`SELECT * FROM contact WHERE id=${req.params.id}`, (err, result)=>{
        if(err){
            next('internalerror');
        }else if(!result.length){
            next('notfound');
        }else{
            res.status(200).send({
                message: `data sukses diambil`,
                result
            })
        }
    })
}

exports.trip= async(req,res,next)=>{
    /**
     * 
     * lat 1 dan lng 1 harusnya langsung dari database, update dari frontend
     * inputan address=> seharusnya convert dari address yang diketik menjadi geolocation 
     * 
     */
    let {lat1,lng1,lat2,lng2} = req.body;

    const R= 6371;
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lng2-lng1);
    var lat3 = toRad(lat1);
    var lat4 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat3) * Math.cos(lat4);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R *c;
    return d;
}


function toRad(Value){
    return Value * Math.PI /180;
}