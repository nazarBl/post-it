const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = (req.headers.authorization||'').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decoded = jwt.verify(token,'secretKiey')
            req.userId = decoded._id;
            next()
        } catch (error) {
            return res.status(403).json({
                message:`No access!`
            })
        }
    } else {
        return res.status(403).json({
            message: `No access!`
        })
    }
}