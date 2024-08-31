import schedule from "node-schedule"

//Класс для планирования событий при записи.

class Scheduler{
    constructor(doctor,slotDate){
        this.doctor = doctor
        this.slotDate = slotDate
        this._returnSlotToDB()
        this._appointmentReminder()
    }

    _returnSlotToDB(){ //Данный планировщик ждёт начала времени приёма, чтобы вернуть слот для доктора в БД(но надо бы придумать и доработать систему, как это время возвращаться будет,
        const job = schedule.scheduleJob(this.slotDate, async function(doctor, slotDate){ //например, приплюсовывать один день от даты слота)
            doctor.dates.push(slotDate)  
            doctor.save() //Сохраняем изменения в БД
        }.bind(null, this.doctor, this.slotDate)) //Это для передачи переменных в нашу функцию
    }

    _appointmentReminder(){ //Данный планировщик предупреждает пользователя за 2 часа до приёма
        let remindDate = new Date(this.slotDate)
        remindDate.setHours(remindDate.getHours() - 2)
        console.log(remindDate)
        const job = schedule.scheduleJob(remindDate, function(doctor, slotDate){
            //Какой-то обработчик воспоминания. Может быть отправление на почту или что-то такое, не придумал
            console.log(`Напоминание пациенту, который записан к доктору ${doctor._id} на время ${slotDate}`)
        }.bind(null, this.doctor, this.slotDate))
    }

}


export default Scheduler
