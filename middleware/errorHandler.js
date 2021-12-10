const errorHandler = (err, req, res, next)=>{
    console.log(err);
    res.status(err.code).json({
        status: 'Error',
        message: err.message
    })
}

module.exports = errorHandler;