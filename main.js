import router from "./router.js"
import authRouter from "./authRouter.js"
import express from "express"
import dotenv from "dotenv"
import mongoose  from "mongoose"
import Doctor from "./db_schemas/doctor.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 7777
const DB_URL = 'mongodb+srv://matvey:z1z2z3@cluster0.yv6uw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(express.json())
app.use('/api',router)
app.use('/auth', authRouter)

async function  startApp() {
    try{
        await mongoose.connect(DB_URL)
        .then(() => console.log("Успешное подключение к бд"))

        app.listen(PORT, ()=>{
            console.log(`Сервер запущен на localhost:${PORT}`)
        })
    }catch (err){
        console.log(err)
    }
}

startApp()

// function createSome(){
//     Doctor.create({
//         "spec":"Стоматолог",
//         "name":"Проверка4",
//         "surname":"Проверка 1",
//         "phone":"832193921123",
//         "age":70,
//         "dates": [ new Date("2024-08-31T14:11:00Z"), new Date("2024-08-31T16:11:00Z")]
         
//      })
// }

// createSome()