import express from "express";
import Student from "../models/Student.js";
import { body, validationResult } from "express-validator";
import session from "express-session";

const route = express();

route.get("/", (req, res) => {
    res.render(
        "register", {
        oldData: {},
        errors: []
    });
});

route.post(
    "/register",
    [
        body("Rollno").notEmpty().withMessage("Rollno Req"),

        body("Name").notEmpty().withMessage("Name Req").isLength({ min: 3 }).withMessage("min 3"),

        body("Email").notEmpty().withMessage("Email Req").isEmail().withMessage("Invalid Email"),

        body("Password").notEmpty().withMessage("Pass Req").isLength({ min: 6 }).withMessage("min 6"),

        body("Age").notEmpty().withMessage("Age Req")
    ],
    async (req, res) => {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                console.log(validationErrors.array());
                return res.render(
                    "register", {
                    oldData: req.body,
                    errors: validationErrors.array()
                });
            }
            const { Rollno, Name, Email, Password, Age } = req.body;

            const student = new Student({ Rollno, Name, Email, Password, Age });

            await student.save();
            res.send("<script>alert('Registration done'); window.location.href = '/login'</script>");
        } catch (error) {
            console.log("Error occured while registration");
            console.log(error);
            res.send("<script>alert('Registration failed')</script>");
        }
    }
);

route.get("/login", (req, res) => {
    res.render("login");
});

const CheckAuth = (req, res, next) => {
    if(req.session.name) {
        next();
    } else {
        res.send("<script>alert('Auth failed'); window.location.href = '/login'</script>");
    }
}

route.post("/login", async (req, res) => {
    const {Email, Password} = req.body;

    const student = await Student.findOne({Email, Password});
    if(!student) {
        return res.send("<script>alert('Invalid credentials'); window.location.href = '/login'</script>");
    }
    req.session.name = student.Name;
    req.session.email = student.Email;

    res.send("<script>alert('Login Successfull'); window.location.href = '/dashboard'</script>");
});

route.get("/dashboard", CheckAuth, (req, res) => {
    const name = req.session.name;
    res.send(`<h1>Welcome ${name} </h1>
        <a href = "/logout">Logout</a>
        `);
});

route.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("<script>alert('Logged out'); window.location.href = '/login'</script>");
});

export default route;