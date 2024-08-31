import mongoose from "mongoose";
import Doctor from "../db_schemas/doctor.js";
import Patient from "../db_schemas/patient.js";
import Appointment from "../db_schemas/appointment.js";
import jwt from "jsonwebtoken";

class AppointController{
    async makeAppointment(req,res){
        const {doctor_id,slot} = req.body
        if (doctor_id == null || slot == null){
            throw new Error("Какие-то значения в payload POST-запроса пропущены! Метод: /appoint")
        }
        try{
            let slotDate = new Date(slot)
            const doctor = await Doctor.findOne({_id : new mongoose.Types.ObjectId(doctor_id)})
            if (!doctor){
                return res.status(400).json("Нет доктора с указанным id")
            }
            let slots = doctor.dates

            if (checkForDate(slotDate,slots)){
                console.log(doctor.dates)
                doctor.save()
                Appointment.create({
                    patient_id: req.user.id,
                    doctor_id: doctor._id,
                    slotDate
                })
                res.status(200).json({message:`Вы успешно записались к ${doctor.spec} ${doctor.name} на время ${slot}`})
            }else{
                res.status(400).json({message:`Нет свободного слота на это время`})
            }
            
        }catch(e){
            console.log(e)
            return res.status(400).json("Не удалось сделать запись к указанному врачу!")
        }
    }
}


function checkForDate(date, slots){
    const found = slots.find((slot) => new Date(slot).getTime()== date.getTime())
    if (found){
        slots = slots.splice(slots.indexOf(found), 1)
        return true
    }
    return false
}

export default new AppointController()