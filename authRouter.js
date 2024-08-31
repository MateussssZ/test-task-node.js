import Router from "express"
const router = new Router()
import AuthController from "./controllers/authController.js"
import {check} from "express-validator"

router.post('/registration', [
    check('username','Username не может быть пустым!').notEmpty(),
    check('password', "Пароль должен быть длиной от 6 до 15 символов!").isLength({min:6,max:15}),
    check('name','Имя не может быть пустым!').notEmpty(),
    check('surname',' Фамилия не может быть пустой!').notEmpty(),
    check('age','Возраст не может быть пустым').isNumeric().notEmpty(),
], AuthController.registration)
router.post('/login', [
    check('username','Username не может быть пустым!').notEmpty(),
    check('password', "Пароль должен быть длиной от 6 до 15 символов!").isLength({min:6,max:15}),
], AuthController.login)



export default router