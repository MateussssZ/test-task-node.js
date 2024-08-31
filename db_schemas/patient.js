import mongoose from "mongoose"

const patientSchema = new mongoose.Schema({    //Схема пациента для БД
    username: {type:String, unique: true, required: true}, //Уникальное обязательное имя пользователя
    password: {type: String, required: true}, //Обязательный пароль
    name: {type: String, required: true}, //Обязательное имя
    surname: {type: String, required: true}, //Обязательная фамилия
    age: {type: Number, required: true}, //Обязательный возраст
    number: String, //Номер телефона(по желанию)
})

export default mongoose.model("Patient", patientSchema)

