import express from 'express';
import multer from 'multer';
import path from 'path';
    
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use("/uploads",express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + (Math.random()*1000000000) + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Logging Middleware
app.use("/", (req, res, next) => {
    console.log("Request URL :" + req.url);
    console.log("Request Method:" + req.method);
    console.log("Request Headers:" + req.headers);
    next();
})

app.get('/', (req, res) => {
    res.render('form1');
});

// Upload endpoint
app.post('/upload', upload.fields([{name: 'profilePicture', maxCount: 1}, {name: 'otherPictures', maxCount: 10}]), (req, res) => {
    console.log('Files uploaded successfully');
    // Rendered preview.ejs with req.files passed as "files"
    res.render('preview', {files: req.files});
});

// Error Handling middleware
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(400).send(`
        <h2> Upload Failed</h2>
        <p>${err.message}</p>
        <a href="/">Go back</a>
    `);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});