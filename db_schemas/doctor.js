import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({
    spec: {type: String, required: true},    
    name: {type: String, required: true},
    surname: {type: String, required: true},
    age: {type: Number, required: true},
    phone: String,
    dates: Array
})

export default mongoose.model("Doctor", doctorSchema)