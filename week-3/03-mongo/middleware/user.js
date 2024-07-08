const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const { username, password } = req.headers;

    if(!username || !password){
        return res.status(401).send("Unauthorized");
    }

    await User.findOne({
        username: username,
        password: password
    })
    .then((user) => {
        if(user){
            next();
        }else{
            res.status(403).json({
                msg: "User doesn't exist"
            });
        }
    });
}

module.exports = userMiddleware;