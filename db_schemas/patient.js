import mongoose from "mongoose"

const patientSchema = new mongoose.Schema({    
    username: {type:String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    age: {type: Number, required: true},
    number: String,
})

export default mongoose.model("Patient", patientSchema)

