import express from "express";
import { createStudent, getAllStudents, getStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:rollno", getStudent);
router.put("/", updateStudent);
router.delete("/:rollno", deleteStudent);

export default router;