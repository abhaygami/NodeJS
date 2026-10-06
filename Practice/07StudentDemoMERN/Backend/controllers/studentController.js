import Student from "../models/Student.js";

export const getAllStudent = async (req, res) => {
    try{
        const students = await Student.find();
        if(!students) {
            return res.status(404).json({message : "No Data Found"});
        } 
        res.status(200).json({students});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error while fetching the data."});
    }
}

export const getStudentByRollno = async (req, res) => {
    try {
        const rollno = req.params.rollno;
        const student = await Student.findOne({rollno: rollno});
        if(!student) {
            return res.status(404).json({message : "No Data Found for this rollno."});
        } 
        res.status(200).json({student});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error while fetching the data."});
    }
}

export const addStudent = async (req, res) => {
    try {
        const { rollno, name, age, course } = req.body;
        const existingStudent = await Student.findOne({rollno: rollno});

        if(existingStudent) {
            return res.status(404).json({message : "Student with this rollno already exist."});
        }

        const newStudent = new Student ({
            rollno,
            name,
            age,
            course
        });

        await newStudent.save();

        res.status(200).json({message: "Student added successfully", newStudent});
    } catch (error) {
        console.log(err);
        res.status(500).json({message: "Error while adding the data."});        
    }
}

export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({rollno: req.params.rollno});

        if(!student) {
            return res.status(404).json({message : "No Student Data Found"});
        }

        res.status(200).json({message: "Record deleted Successfully", student});
    } catch (error) {
        console.log(err);
        res.status(500).json({message: "Error while deleting the data."});
    }
}

export const updateStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate({rollno: req.params.rollno}, req.body, {new: true});

        if(!student) {
            return res.status(404).json({message : "No Student Found"});
        }

        res.status(200).json({message: "Student Updated successfully",student});
    } catch (error) {
        console.log(err);
        res.status(500).json({message: "Error while fetching the data."});
    }
}