import router from "./router.js"
import authRouter from "./authRouter.js"
import express from "express"
import dotenv from "dotenv"
import mongoose  from "mongoose"
import addDoctors from "./migrations/addDoctors.js"

dotenv.config() //Подключаем переменные окружения из файла .env
const app = express()
const PORT = process.env.PORT || 7777
const DB_URL = 'mongodb+srv://matvey:z1z2z3@cluster0.yv6uw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' //Бд хранится в облаке mongodb

app.use(express.json()) //Для того, чтобы наш сервер принимал и понимал json
app.use('/api',router) //Обработчик запросов на api
app.use('/auth', authRouter) //Обработчик запросов на авторизацию

async function  startApp() { //Асинхронно подключаемся к бд и запускаем наш сервер
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
addDoctors() //Добавить случайных докторов, если в БД никого нет(для теста)