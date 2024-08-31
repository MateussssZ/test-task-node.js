import Router from "express"
import DoctorController from "./controllers/doctorController.js"
import AppointController from "./controllers/appointController.js"
import authMiddleware from "./middlewares/authMiddleware.js"

const router = new Router() //Описываем, какие запросы у нас могут поступать по адресу /api, а также внедряем middleware для проверки авторизации
router.get('/doctors', authMiddleware, DoctorController.findAllDoctors) 
router.get('/doctors/:id', authMiddleware, DoctorController.findDoctorById)
router.post('/appoint', authMiddleware, AppointController.makeAppointment)


export default router