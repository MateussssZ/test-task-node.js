import mongoose from "mongoose";
import Doctor from "../db_schemas/doctor.js";
import Appointment from "../db_schemas/appointment.js";
import Scheduler from "../scheduler/scheduler.js";

class AppointController{ //Контроллер для обработки запросов, связанных с записью на приём
    async makeAppointment(req,res){
        const {doctor_id,slot} = req.body
        if (doctor_id == null || slot == null){
            throw new Error("Какие-то значения в payload POST-запроса пропущены! Метод: /appoint") //Проверяем поступившие в body данные
        }
        try{
            let slotDate = new Date(slot)
            const doctor = await Doctor.findOne({_id : new mongoose.Types.ObjectId(doctor_id)})
            if (!doctor){
                return res.status(400).json("Нет доктора с указанным id") //Ищем доктора с указанным id и смотрим, существует ли он вообще, какие у него есть слоты на запись
            }
            let slots = doctor.dates

            if (checkForDate(slotDate,slots)){ //Проверяем, есть ли наш слот среди доступных
                doctor.save()
                Appointment.create({ //Создаём запись и отправляем её в бд. В ней храним: кто, к кому и во сколько
                    "patient_id": req.user.id,
                    "doctor_id": doctor._id,
                    "slot" : slotDate
                })

                new Scheduler(doctor, slotDate) //Создаём экземпляр класса Scheduler, он в конструкторе вызывает нужные события на определённое время
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
    const found = slots.find((slot) => new Date(slot).getTime()== date.getTime()) //Просто проверяем введённую дату со всеми доступными по очереди. Если нашли - удаляем у доктора
    if (found){                                                                   //Эту дату из доступных и идём дальше 
        slots = slots.splice(slots.indexOf(found), 1)
        return true
    }
    return false
}

export default new AppointController()