import Doctor from "../db_schemas/doctor.js"

let names = ["Илья","Мага","Димас","Владимир","Сергей",] //Случайные параметры докторов
let surnames = ["Абуев","Тигров","Магомедов","Дмитриев","Лысов"]
let ages = [15, 20, 30, 40, 103]
let specs = ["Хирург","Эндокринолог","Врач","Стоматолог","Терапевт"]
let dates = [new Date("2024-09-1T14:00:00Z"),new Date("2024-09-1T14:30:00Z"),new Date("2024-09-1T15:00:00Z"),new Date("2024-09-1T15:30:00Z"),new Date("2024-09-1T16:00:00Z")]

async function addDoctors() {
    const doctors = await Doctor.find()
    if (doctors.length==0){ //Если в бд нет ни одного доктора, то создадим 5 рандомных.
        for (let i = 0; i < 5; i++){
            Doctor.create({
                "spec":specs[Math.random()*5],
                "name":names[Math.random()*5],
                "surname":surnames[Math.random()*5],
                "age":ages[Math.random()*5],
                "phone":"89032349212",
                "dates":[dates[Math.random()*5], dates[Math.random()*5]]
            })
        }
    }
}

export default addDoctors 