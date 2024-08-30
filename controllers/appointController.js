import mongoose from "mongoose";
import Doctor from "../db_schemas/doctor.js";
import Patient from "../db_schemas/patient.js";

class AppointController{
    async makeAppointment(req,res){
        const {user_id,doctor_id,slot} = req.body
        if (user_id == null || doctor_id == null || req.body == null){
            throw new Error("Какие-то значения в payload POST-запроса пропущены! Метод: /appoint")
        }
        try{
            const doctor = await Doctor.findOne({_id : new mongoose.Types.ObjectId("66d19200eb667ec91d6cfcac")})//doctor_id})
            const patient = await Patient.find({_id : user_id})
            const slots = doctor.dates

            if (checkForDate(slot,slots)){
                res.status(200).json({message:`Вы успешно записались к ${doctor.spec} ${doctor.name} на время ${slot}`})
            }else{
                res.status(400).json({message:`Нет свободного слота на это время`})
            }
            
        }catch(e){
            console.log(e)
        }
    }
}


function checkForDate(date, slots){
    Object.keys(slots).forEach((slot) =>{
        if (date.getTime()==slot.getTime()){
            delete slots[slot]
            return true
        }
        
    })
    return false
}

export default new AppointController()