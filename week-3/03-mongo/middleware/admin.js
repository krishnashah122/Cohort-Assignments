const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const { username, password } = req.headers;

    if(!username || !password){
        return res.status(401).send("Unauthorized");
    }

    await Admin.findOne({
        username: username,
        password: password
    })
    .then((admin) => {
        if(admin){
            next();
        }else{
            res.status(403).json({
                msg: "Admin doesn't exist"
            });
        }
    });
}

module.exports = adminMiddleware;