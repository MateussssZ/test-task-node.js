import Router from "express"
import DoctorController from "./controllers/doctorController.js"
import AppointController from "./controllers/appointController.js"

const router = new Router()
router.get('/doctors', DoctorController.findAllDoctors)
router.get('/doctors/:id', DoctorController.findDoctorById)
router.get('/appoint', AppointController.makeAppointment)


export default router