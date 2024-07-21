const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    
    if(!username || !password){
        return res.status(400).send('Please provide username and password');
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await Admin.create({
            username: username,
            password: hashedPassword
        });
    
        res.json({
            message: "Admin created successfully"
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to create admin"
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
        const admin = await Admin.findOne({ username: username });
    
        if(!admin){
            return res.status(404).send('Admin not found');
        }
    
        const isAdmin = await bcrypt.compare(password, admin.password);
    
        if(!isAdmin){
            return res.status(400).send('Incorrect credentials');
        }
    
        const token = await jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.json({
            message: "Admin signed in successfully",
            token: token
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to sign in admin"
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    if(!title || !description || !price){
        return res.status(400).send('Please provide title, description and price');
    }

    try{
        const newCourse = await Course.create({
            title: title,
            description: description,
            imageLink: imageLink? imageLink : undefined,
            price: price
        });
    
        const username = req.headers.username;
    
        await Admin.updateOne({
            username: username
        }, {
            $push: {
                publishedCourses: newCourse._id
            }
        });
    
        res.json({
            message: "Course created successfully",
            courseId: newCourse._id
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to create course"
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try{
        const courseList = await Course.find({});
    
        res.json({
            courses: courseList
        });
    }catch(error){
        return res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
});

module.exports = router;