const jwt = require('jsonwebtoken');

var tokenValue='';
module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, 'SECRET#123',
            (err, decoded) => {
                
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    tokenValue = decoded;
                    req._id=tokenValue.data[0]  
                   // console.log(tokenValue.data[0]._id);                  
                    
                    next();
                }
            }
        )
    }
}

// module.exports.userProfile=(req,res,next)=>{
//     return res.status(200).json({ user: tokenValue.data[0] });
// }