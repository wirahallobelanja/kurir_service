const app = require('./app')
const {sequelize} = require('./models')

app.listen(3000, async(req,res)=>{
    console.log('server running normal')
    console.log('db connected')
})