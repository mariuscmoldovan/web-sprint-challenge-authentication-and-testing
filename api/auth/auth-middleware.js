const db = require('./auth-model')

const checkUsernameExists = async(req, res, next) => {
    try{
        const [user] = await db.findBy({username: req.body.username})
        if(user){
            next({status: 422, message: "username taken"})
        }else{
            req.user = user
            next()
        }
    } catch(err){
        next(err)
      }
}
const validateUserExsist = async(req, res, next) => {
    try{
        const [user] = await db.findBy({username: req.body.username})
         if(!user){
            next({status: 422, message: "invalid credentials"})
        }else{
            req.user = user
            next()
        }
    }catch(err){
        next(err)
      }
}

const checkBodyValidation = (req, res, next)=>{
    if(!req.body.username || !req.body.password){
        res.status(422).json({ message: "username and password required"})
    }else{next()}
}

module.exports ={
    checkUsernameExists,
    checkBodyValidation,
    validateUserExsist
}