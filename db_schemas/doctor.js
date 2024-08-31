import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({ //Схема доктора для БД
    spec: {type: String, required: true},    //Обязательная специальность
    name: {type: String, required: true}, //Обязательное имя
    surname: {type: String, required: true}, //Обязательная фамилия
    age: {type: Number, required: true}, //Обязательный возраст
    phone: String, //Телефон(по желанию)
    dates: Array //Доступные слоты для приёма(может быть пустым, если врач - в отпуске)
})

export default mongoose.model("Doctor", doctorSchema)