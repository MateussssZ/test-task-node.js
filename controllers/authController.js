import bcrypt from "bcryptjs"
import Patient from "../db_schemas/patient.js"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

class authController{ //Класс для обработки запросов, касающихся авторизации пользователя
    async registration(req, res){
        try{
            const errors = validationResult(req) //Если вылезла ошибка валидации поступивших данных - отправляем их пользователю
            if (!errors.isEmpty){
                res.status(400).json({message: "Ошибки при регистрации", errors})
            }

            const {username,password,name,surname,age,number} = req.body //Берём заступившие параметры, проверяем, нет ли такого пациента уже в БД
            const candidate = await Patient.findOne({username})
            if (candidate){
                return res.status(400).json("Пользователь с таким именем уже существует")
            }
            const hashPassword = bcrypt.hashSync(password,7) //Пароль в БД лучше хранить захэшированным для безопасности, поэтому хэшируем
            const patient = new Patient({username, password: hashPassword, name,surname,age,number}) 
            patient.save() //Создаём пациента и сохраняем состояние БД
            return res.json("Пользователь успешно зарегистрирован!")

        }catch(e){
            console.log(e)
            res.status(400).json("Ошибка регистрации")
        }
    }

    async login(req, res){
        try{
            const {username,password} = req.body //Берём параметры из body и сразу проверяем, существует ли такой пользователь в БД
            const patient = await Patient.findOne({username})
            if (!patient){
                return res.status(400).json("Пользователь с таким именем не существует")
            }
            const validatePassword = bcrypt.compareSync(password, patient.password) //Сверяем поступивший пароль с захэшированным в бд
            if (!validatePassword){
                return res.status(400).json("Неправильно введён пароль!")
            }

            const token = generateAccessToken(patient._id, username) //Генерируем JWT и отправляем юзеру, чтобы он сохранил его в headers и имел доступ к API
            return res.json({token})

        }catch(e){
            console.log(e)
            res.status(400).json("Ошибка входа")
        }
    }
}

const generateAccessToken = (id, username) => {
    const payload = { //Нагрузка в том числе используется для генерации JWT. Тут может быть что угодно
        id,
        username
    }
    const secret = process.env.secret || "plug" //Секретный ключ для шифровки. Желательно указать его в .env, но если не указан - будет просто заглушка
    return jwt.sign(payload, secret, {expiresIn : "24h"}) //Делаем подпись и возвращаем её(подпись действует ровно 24 часа)
}

export default new authController