import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({ //Схема для хранения того, какой пациент к какому доктору записан и во сколько
    patient_id: {type: mongoose.Types.ObjectId, required: true, ref: "Patient"}, //Обязательный _id пациента
    doctor_id: {type: mongoose.Types.ObjectId, required: true, ref: "Doctor"}, //Обязательный _id доктора
    slot: {type: Date, required:true} //Обязательное время для записи
})

export default mongoose.model("Appointment", appointmentSchema)