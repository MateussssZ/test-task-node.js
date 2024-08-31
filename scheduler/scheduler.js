import schedule from "node-schedule"

class Scheduler{
    constructor(doctor,slotDate){
        this.doctor = doctor
        this.slotDate = slotDate
        this._returnSlotToDB()
        this._appointmentReminder()
    }

    _returnSlotToDB(){
        const job = schedule.scheduleJob(this.slotDate, async function(doctor, slotDate){
            doctor.dates.push(slotDate)
            doctor.save()
        }.bind(null, this.doctor, this.slotDate))
    }

    _appointmentReminder(){
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
