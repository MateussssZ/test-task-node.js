import Doctor from "../db_schemas/doctor.js";

class DoctorController{ //Класс для обработки запросов, касающихся доктора
    async findAllDoctors(req,res){ //Функция для поиска всех докторов в БД
        try{
            const doctors = await Doctor.find() //Все запросы в бд асинхронные. Просто выводим всех докторов в формате json
            res.json(doctors)
        }catch(e){
            console.log(e)
            res.status(500).json(e)
        }
    }

    async findDoctorById(req,res){ //Функция для поиска конкретного доктора в БД
        try{
            const {id} = req.params //Забираем id и смотрим, указан ли он вообще
            if (!id){
                res.status(400).json({message:"Не указан id доктора!"})
            }
            const doctor = await Doctor.findOne({_id: id}) //Ищем доктора по фильтру и выводим его, если он найден
            res.json(doctor)
        }catch(e){
            console.log(e)
            res.status(500).json(e)
        }
    }

    

}

export default new DoctorController()
