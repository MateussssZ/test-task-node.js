import router from "./router.js"
import authRouter from "./authRouter.js"
import express from "express"
import dotenv from "dotenv"
import mongoose  from "mongoose"
import Doctor from "./db_schemas/doctor.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
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
//         "name":"Димас",
//         "surname":"Димасыч",
//         "phone":"832193921123",
//         "age":70,
//         "dates": [ new Date("2020-10-10T15:30:00Z")]
         
//      })
// }

// createSome()