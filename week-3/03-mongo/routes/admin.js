const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    
    if(!username || !password){
        return res.status(400).send('Please provide username and password');
    }

    await Admin.create({
        username: username,
        password: password
    });

    res.json({
        message: "Admin created successfully"
    });
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
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courseList = await Course.find({});

    res.json({
        courses: courseList
    });
});

module.exports = router;