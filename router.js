import Router from "express"
import DoctorController from "./controllers/doctorController.js"
import AppointController from "./controllers/appointController.js"
import authMiddleware from "./middlewares/authMiddleware.js"

const router = new Router()
router.get('/doctors', authMiddleware, DoctorController.findAllDoctors)
router.get('/doctors/:id', authMiddleware, DoctorController.findDoctorById)
router.post('/appoint', authMiddleware, AppointController.makeAppointment)


export default router