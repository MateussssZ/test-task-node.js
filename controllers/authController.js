import bcrypt from "bcryptjs"
import Patient from "../db_schemas/patient"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

class authController{
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty){
                res.status(400).json({message: "Ошибки при регистрации", errors})
            }

            const {username,password,name,surname,age,number} = req.body
            const candidate = Patient.findOne({username})
            if (candidate){
                return res.status(400).json("Пользователь с таким именем уже существует")
            }
            const hashPassword = bcrypt.hashSync(password,7)
            const patient = new Patient({username, password: hashPassword, name,surname,age,number})
            patient.save()
            return res.json("Пользователь успешно зарегистрирован!")

        }catch(e){
            console.log(e)
            res.status(400).json("Ошибка регистрации")
        }
    }

    async login(req, res){
        try{
            const {username,password} = req.body
            const patient = Patient.findOne({username})
            if (!patient){
                return res.status(400).json("Пользователь с таким именем не существует")
            }
            const validatePassword = bcrypt.compareSync(password, patient.password)
            if (!validatePassword){
                return res.status(400).json("Неправильно введён пароль!")
            }

            const token = generateAccessToken(patient._id, username)
            return res.json({token})

        }catch(e){
            console.log(e)
            res.status(400).json("Ошибка входа")
        }
    }
}

const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username
    }
    const secret = process.env.secret || "plug"
    return jwt.sign(payload, secret, {expiresIn : "24h"})
}

export default new authController