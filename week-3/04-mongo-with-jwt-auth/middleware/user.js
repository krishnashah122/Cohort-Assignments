const jwt = require("jsonwebtoken");
require("dotenv").config();

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization?.split(" ")[1];

    try{
        if(!token){
            return res.status(401).send("Unauthorized");
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err){
                return res.status(401).send("Unauthorized");
            }
            next();
        });
    }catch(error){
        return res.status(401).send("Unauthorized");
    }
}

module.exports = userMiddleware;