import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    rollno: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;