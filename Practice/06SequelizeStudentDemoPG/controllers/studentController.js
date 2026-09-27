import Student from '../models/Student.js';

export const createStudent = async (req, res) => {
    try {
        const { rollno, name, div, age, course } = req.body;
        const student = await Student.create({ rollno, name, div, age, course });
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

export const getStudent = async (req,res) => {
    try {
        const student = await Student.findByPk(req.params.rollno);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ student });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
};

export const updateStudent = async (req,res) => {
    try {
        const { rollno, name, div, age, course } = req.body;
        const student = await Student.findByPk(rollno);
        if(!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const updatedStudent = await student.update({ rollno, name, div, age, course });
        res.status(200).json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};

export const deleteStudent = async (req,res) => {
    try {
        const student = await Student.findByPk(req.params.rollno);
        if(!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.destroy();
        res.status(200).json({ message: 'Student deleted successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};