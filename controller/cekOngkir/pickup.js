const conn = require('../config/config');

exports.getUser=(req,res,next)=>{
    conn.query('SELECT * FROM user', (err, result)=>{
        if(err){
            next('internalerror')
        }else if(result.length){
            res.status(200).json({
                message: 'data user ada',
                result
            });
        }else{
            next('notfound')
        }
    });
}

exports.getUserById=(req,res,next)=>{
    conn.query(`SELECT * FROM user WHERE id=${req.params.id}`, (err, result)=>{
        if(err){
            next('internal serever error')
        }else if(result.length){
            res.status(200).send({
                message: 'sukses mendapatkan data',
                result
            });
        }else{
            next('data notfound');
        }
    })
}

exports.addPickup=(req,res,next)=>{
    const{uid, namaPemilik, namaBarang, origin, tujuan, status, dimensi, harga}= req.body;
    const dataBarang={
        uid,
        namaPemilik,
        namaBarang,
        origin,
        tujuan,
        status,
        dimensi,
        harga
    }
    conn.query(`INSERT INTO kirimBarang SET ?`, dataBarang, (err, ress)=>{
        if(err){
            next('internal server error');
        }else{
            res.status(200).json({
                message: 'data berhasil ditambahkan',
                dataBarang
            })
        }
    })
}

exports.updateResi=(req,res,next)=>{
    const{uid} = req.params;
    const {status} = req.body;

    const updateRes={
        status
    }
    conn.query(`UPDATE kirimBarang SET ? WHERE id=${uid}`, updateRes,(err, ress)=>{
        if(err){
            next('internal server error');
        }else if(ress.affectedRows){
            res.status(200).json({
                message: 'update status berhasil',
                ress
            })
        }else{
            next('data notfound');
        }
    })
}

exports.deleteResi=(req,res,next)=>{
    const{uid}= req.params;
    conn.query(`DELETE FROM kirimBarang WHERE id=${uid}`, (err, ress)=>{
        if(err){
            next('internal server error')
        }else if(ress.affectedRows){
            res.status(200).json({
                message: 'sukses delete data',
                ress
            })
        }else{
            next('data notfound')
        }
    })
}