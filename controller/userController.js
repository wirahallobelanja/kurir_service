const {Users} = require("../models");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

// exports.signup=async(req,res,next)=>{
//     try {
//         let{name, email, password}= req.body;

//         if(!email.includes("@")){
//             return next({code: 400, message: "Invalid Email"});

//         }
//         let exist = await user.findOne({where:{email}});

//         if(exist){
//             next({code: 409, message: "This email is alredy registered"});
//         }else{
//             password = bcrypt.hashSync(password,10);
//             let newAccount = await user.create({
//                 name,
//                 email,
//                 password,
//                 role: "user",
//             });

//             let tampil ={
//                 status: 'success',
//                 details: {name, email}
//             }
//             res.status(201).json(tampil);
//         }
//     } catch (error) {
//         next({code:500, message: error.message});
        
//     }
// }

// exports.login=async(req,res,next)=>{
//     try {
//         const {email, password}= req.body;
//         const user_ = await user.findOne({
//             where:{
//                 email:email,
//             },
//         });
//         if(!user_){
//             next({code: 401, message: "Loin Failed"});
//         }else{
//             const userJson = user_.toJSON();
//             const validate = bcrypt.compareSync(password, userJson.password);
            
//             if (!validate) {
//                 next({code: 401, message: "Login Failed"});
//             }else{
//                 if(!userJson.token){
//                     let sendToken = jwt.sign(
//                         {id: userJson.id, role: userJson.role},
//                         process.env.JWT_TOKEN,
//                     );

//                     await user.update({token: sendToken}, {where: {id:userJson.id}});


//                     res.status(200).json({
//                         message: 'Success Login',
//                         token: sendToken
//                     })
//                 }else{
//                     res.status(200).json({
//                         message:'Success Login',
//                         token: userJson.token
//                     })
//                 }

                
//                 res.status(200).json({
//                     message:'Success Login',
//                     token: sendToken
//                 })
//             }
//         }
//     } catch (error) {
//         next({code:500, message:error.message});
//     }
// }
// exports.getAll=async(req,res,next)=>{
//     try {
//         const data = await user.findAll({
//             attributes:{
//                 exclude:['createdAt', 'updatedAt', 'password', 'token']
//             }
//         })
//         res.status(200).json(data)
//     } catch (error) {
//         next({code:500, message: error.message})
//     }
// }

// exports.getId= async(req,res,next)=>{
//     try {
//         let{updateId} = req.params

//         if(req.currentUser.id !== +updateId){
//             return next({code: 403, message: 'Forbidden'})
//         }

//         let user = await user.findByPk(id)
//         res.status(200).json(user)
//     } catch (error) {
//         next({code:500, message: error.message})
//     }
// }

exports.register= async(req,res,next)=>{
    try {
        const {name,email,password} = req.body

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return next({code:406,message:"format email is not correct"})
        }

        const isExist = await Users.findOne({
            where : {email : email}
        })
        
        if(isExist){
            return next({code:409,message:"email already exist"})
        }

        const hashed = bcrypt.hashSync(password,8)
        let data = {
            name:name,
            email:email,
            password:hashed,
            role:"user",
            status:"online"
        }
        const newUser = await Users.create(data)

        res.status(201).json({
            message : "user created",
            data : {name: data.name, email: data.email, role: data.role}
        })
    } catch (error) {
        next({code:500,message:error.message})
    }
}

exports.login=async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        
        // cek apakah emailnya ada?
        let user = await Users.findOne({
            where : {
                email : email
            }
        })

        if(!user) {
            throw new Error ("invalid email / password")
        }


        //cek apakah passnya bener
        if(!bcrypt.compareSync(password,user.password)){
            throw new Error ("invalid email / password")
        }

        //kembalikan access token
        const jwtPayload = {
            userId : user.id,
            role   : user.role
        };

        const accesstoken = jwt.sign(jwtPayload,"charlie")

        res.status(200).json({
            message : `Login Berhasil, Selamat Datang ${user.name}`,
            accessToken : accesstoken,
            payload : jwtPayload
        })

    } catch (error) {
        next({code:500,message:error.message})
    }
}

exports.getAll= async(req,res,next)=>{
    try {
        const currentUser = req.currentUser
            if(currentUser.role === "admin"){
                let data = await Users.findAll({attributes : ["id","name","email","role"],
                    attributes: {
                        exclude: ['password','createdAt', 'updatedAt']
                        },
                    })
                res.status(200).json({
                    users : data,
                    currentUser : currentUser // mengetahui siapa yang sedang login dari authentication
                })
            }
            if (currentUser.role === "user"){
                try {
                    let data = await Users.findOne({
                        where : {
                            role: currentUser.role
                        }
                    })
                    res.status(200).json({
                        users : data,
                        currentUser : currentUser // mengetahui siapa yang sedang login dari authentication
                    })
                } catch (error) {
                    next({code : 404,message:"Not Found"})
                }
                // if(currentUser.Class.dataValues.Teacher === "null"){
                //     return next({code : 404,message:"Guru tidak terdaftar dimanapun"})
                // }
                // console.log(currentUser.Class.dataValues.Teacher)
                
            }

            console.log(currentUser)
            
            console.log(currentUser.role)

        // const data = await Users.findAll(
        //     {
        //         attributes:{
        //             exclude:['createdAt','updatedAt']
        //         }
        //     }
        // );

        // if(!data.length){
        //     return next({code:404, message:'Not Found'})
        // }
        // res.status(200).json({
        //     status:'success',
        //     data
        // })
        // console.log(data)
    } catch (error) {
        next({code:500,message:error.message||'internal server error'})
    }
}
