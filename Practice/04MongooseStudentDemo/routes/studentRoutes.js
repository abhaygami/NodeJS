import express from "express";

import {
    addStudent,
    getAllStudents,
    getStudentByRollno,
    updateStudent,
    deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", addStudent);
router.get("/", getAllStudents);
router.get("/:rollno", getStudentByRollno);
router.put("/:rollno", updateStudent);
router.delete("/:rollno", deleteStudent);

export default router;