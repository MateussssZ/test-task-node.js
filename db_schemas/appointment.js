import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    patient_id: {type: mongoose.Types.ObjectId, required: true, ref: "Patient"},
    doctor_id: {type: mongoose.Types.ObjectId, required: true, ref: "Doctor"},
    slot: {Date}
})

export default mongoose.model("Appointment", appointmentSchema)