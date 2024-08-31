import jwt from "jsonwebtoken"
import dotenv from "dotenv"

//Данный middleware служит для проверки авторизованности пользователя

dotenv.config()
const secret = process.env.secret || "plug" //Секретный ключ для шифровки паролей в базе данных

export default function(req, res, next){ //Функция получает потоки req и res от сервера, а также функцию next(следующий middleware)
    if (req.method === "OPTIONS"){
        next()
    }
    
    try{
        const token = req.headers.authorization.split(' ')[1] //JWT токены обычно передаются в формате "Bearer kdasdksa", где bearer - что-то типо подписи, в этой строке мы отделяем её от токена
        if (!token){
            return res.status(403).json("Отсутствует токен авторизации")
        }

        const decodedData = jwt.verify(token, secret) //Декодируем токен ключом и, если данные совпадают, идём дальше
        req.user = decodedData
        next()
    }catch(e){
        console.log(e)
        return res.status(403).json("Пользователь не авторизован")
    }
}