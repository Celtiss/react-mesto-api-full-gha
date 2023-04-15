/* eslint-disable consistent-return */
const express = require('express');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  errors,
} = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT = 3000, DB_PATH = 'mongodb://localhost:27017/mestodb' } = process.env;
//const cors = require('cors');

const app = express();

// Подключение к БД
mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Ошибка подключения базы данных: ${err}`));

// // Обработка CORS
// const whitelist = [

// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['PUT', 'DELETE', 'PATCH', 'GET', 'HEAD', 'POST'],
//   credentials: true,
//   allowedHeaders: ['Authorization', 'Content-Type'],
// };

// app.use(cors({
//   origin: [
//     'http://mesto.sarena.nomoredomains.monster',
//     'https://mesto.sarena.nomoredomains.monster',
//     'http://localhost:3000',
//     'https://localhost:3000',
//   ],
// }));
// const allowedCors = [
//   'https://mesto.temirbekova.nomoredomains.monster',
//   'http://mesto.temirbekova.nomoredomains.monster',
//   'localhost:3000',
// ];

// const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// app.use((req, res, next) => {
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', '*');
//   }
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     res.header('Access-Control-Allow-Credentials', 'true');
//     return res.end();
//   }

//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger); // логгер запросов
app.use(routes);
app.use(errorLogger); // логгер ошибок

// // ОБРАБОТКА ОШИБОК
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
