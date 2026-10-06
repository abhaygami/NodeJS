import { Router } from "express";
import { addStudent, getAllStudent, getStudentByRollno, updateStudent,deleteStudent } from "../controllers/studentController.js";

const route = Router();

route.get("/", getAllStudent);
route.get("/:rollno", getStudentByRollno);
route.post("/", addStudent);
route.delete("/:rollno", deleteStudent);
route.put("/:rollno", updateStudent);

export default route;