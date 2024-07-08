const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).send('Please provide username and password');
    }

    await User.create({
        username: username,
        password: password
    });

    res.json({
        message: "User created successfully"
    });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courseList = await Course.find({});

    res.json({
        courses: courseList
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    if(!courseId){
        return res.status(400).send('Please provide course id');
    }

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
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;

    const user = await User.findOne({ username: username });

    const courseList = await Course.find({
        _id: {
            $in: user.purchasedCourses
        }
    });

    res.json({
        courses: courseList
    });
});

module.exports = router