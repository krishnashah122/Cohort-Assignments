const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).send('Please provide username and password');
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await User.create({
            username: username,
            password: hashedPassword
        });
    
        res.json({
            message: "User created successfully"
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to create user"
        });
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).send('Please provide username and password');
    }

    try{
        const user = await User.findOne({ username: username });
    
        if(!user){
            return res.status(404).send('User not found');
        }
    
        const isUser = await bcrypt.compare(password, user.password);
    
        if(!isUser){
            return res.status(400).send('Incorrect credentials');
        }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.json({
            message: "User signed in successfully",
            token: token
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to sign in user"
        });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const courseList = await Course.find({});
    
        res.json({
            courses: courseList
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to get courses"
        });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    if(!courseId){
        return res.status(400).send('Please provide course id');
    }

    try{
        await User.updateOne({
            username: username
        }, {
            $push: {
                purchasedCourses: courseId
            }
        });
    
        res.json({
            message: "Course purchased successfully"
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to purchase course"
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;

    try{
        const user = await User.findOne({ username: username });
    
        const courseList = await Course.find({
            _id: {
                $in: user.purchasedCourses
            }
        });
    
        res.json({
            courses: courseList
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to fetch purchased courses"
        });
    }
});

module.exports = router