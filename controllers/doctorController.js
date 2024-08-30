import Doctor from "../db_schemas/doctor.js";

class DoctorController{
    async findAllDoctors(req,res){
        try{
            const doctors = await Doctor.find()
            console.log(doctors)
            res.json(doctors)
        }catch(e){
            console.log(e)
            res.status(500).json(e)
        }
    }

    async findDoctorById(req,res){
        try{
            const {id} = req.params
            if (!id){
                res.status(400).json({message:"Не указан id доктора!"})
            }
            const doctor = await Doctor.findOne({_id: id})
            res.json(doctor.dates[0])
        }catch(e){
            console.log(e)
            res.status(500).json(e)
        }
    }

    

}

export default new DoctorController()
