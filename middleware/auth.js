const jwt = require('jsonwebtoken')
const {user} = require('./../models')

class auth{
    static Authentication = async(req,res,next)=>{
        let {token} = req.headers;
        let {updateId}= req.params;

        if(!token){
            return next({code:401, message: 'Access Deniedm, Please Login'}
            )
        }else{
            if(updateId){
                let user_ = await user.findByPk(+updateId);
                if (token !=- user_.token) {
                    return next({code:401, message:'Invalid Token'})
                }
            }

            jwt.verify(token, process.env.JWT_TOKEN, (err, result)=>{
                if(err){
                    next({code:401, message: err.message || 'Invalid Credential'})
                }else{
                    req.currentUser = result
                    next()
                }
            })
        }
    };
    static Authorization =(roles) => async(req,res,next)=>{
        try {
            if (!role.includes(req.currentUser.role)) {
                next({
                    code:403,
                    message: "Forbiden",
                });
            }else{
                next()
            }
        } catch (error) {
            next({code:500, message:"Internal Server Error"});
        }
    }
}

module.exports = auth;