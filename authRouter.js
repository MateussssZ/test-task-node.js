import Router from "express"
const router = new Router()
import AuthController from "./controllers/authController.js"
import {check} from "express-validator"

//Описываем, какие запросы у нас могут поступать по адресу /auth, а также делаем валидацию(хотя бы лёгкую) поступающих данных, чтобы в бд не хранился всякий мусор
router.post('/registration', [
    check('username','Username не может быть пустым!').notEmpty(),
    check('password', "Пароль должен быть длиной от 6 до 15 символов!").isLength({min:6,max:15}),
    check('name','Имя не может быть пустым!').notEmpty(),
    check('surname',' Фамилия не может быть пустой!').notEmpty(),
    check('age','Возраст не может быть пустым').isNumeric().notEmpty(),
], AuthController.registration) //После валидации отправляем на соответствующие контроллеры
router.post('/login', [
    check('username','Username не может быть пустым!').notEmpty(),
    check('password', "Пароль должен быть длиной от 6 до 15 символов!").isLength({min:6,max:15}),
], AuthController.login)



export default router