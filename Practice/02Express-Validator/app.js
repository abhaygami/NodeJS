import express from "express";
import { body, validationResult } from "express-validator";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();

const PORT = process.env.PORT || 3000 ;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
    console.log(`${req.method} | ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.render("userForm", {
        errors: [],
        data: {},
        status: null
    });
});

app.post("/register", [
    body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters long"),

    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

    body("confirm_password")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    
    body("gender")
    .notEmpty()
    .withMessage("Gender is required"),

    body("hobbies")
    .notEmpty()
    .withMessage("Hobbies are required"),

    body("city")
    .notEmpty()
    .withMessage("City is required")

], (req, res) => {
    const errors = validationResult(req);
    const status = errors.isEmpty() ? true : false;

    console.log(errors.array());
    
    res.render("userForm", {
        errors: errors.array(),
        data: req.body,
        status : status
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});