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

const app = express();

// Подключение к БД
mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Ошибка подключения базы данных: ${err}`));

// Обработка CORS
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

app.use(function(req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

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
