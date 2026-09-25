import Student from "../models/Student.js";

export const addStudent = async (req, res) => {
    try {
        const {rollno, name, age, course} = req.body;

        const existingStudent = await Student.findOne({rollno});
        
        if(existingStudent){
            return res.status(400).json({message: "Student already exists"});
        }

        const student = new Student({
            rollno,
            name,
            age,
            course
        });

        await student.save();

        res.status(201).json({message: "Student added successfully", student});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error adding student"});
    }
}

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({students});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching students"});
    }
}

export const getStudentByRollno = async (req, res) => {
    try {
        const student = await Student.findOne({rollno: req.params.rollno});
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        res.status(200).json({student});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching student"});
    }
}

export const updateStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate({rollno: req.params.rollno}, req.body, {new: true});
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        res.status(200).json({message: "Student updated successfully", student});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error updating student"});
    }
}

export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({rollno: req.params.rollno});
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        res.status(200).json({message: "Student deleted successfully", student});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error deleting student"});
    }
}