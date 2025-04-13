import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import {checkAuth, handleValidationErrors} from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';

import cors from 'cors';

/**
 * Подключение к MongoDB.
 * @async
 * @function connect
 * @throws {Error} Если подключение не удалось.
 */
mongoose
  .connect(
 'mongodb+srv://trcaa:3JkjgCucCB56s45G@testcluster.vqwnrld.mongodb.net/blog?retryWrites=true&w=majority&appName=testCluster',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();

/**
 * Настройка CORS.
 * @type {import('cors').CorsOptions}
 */
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

/**
 * Настройка Multer для загрузки файлов.
 * @type {import('multer').StorageEngine}
 */
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Middleware для обработки JSON и статических файлов
app.use(express.json()); 
app.use('/uploads', express.static('uploads'));

/**
 * Роуты аутентификации:
 * - Вход (`/auth/login`)
 * - Регистрация (`/auth/register`)
 * - Получение данных текущего пользователя (`/auth/me`)
 */
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

/**
 * Загрузка изображений.
 * @name POST /upload
 * @function
 * @middleware checkAuth - Проверка авторизации.
 * @middleware upload.single('image') - Обработка загрузки одного файла.
 * @param {import('express').Request} req - Запрос Express.
 * @param {import('express').Response} res - Ответ Express.
 */
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

/**
 * Роуты для работы с постами:
 * - Получение всех постов (`/posts`)
 * - Получение одного поста (`/posts/:id`)
 * - Создание поста (`/posts`)
 * - Удаление поста (`/posts/:id`)
 * - Обновление поста (`/posts/:id`)
 */
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

/**
 * Запуск сервера на порту 4444.
 * @param {number} port - Порт сервера.
 * @param {Function} callback - Колбек, вызываемый после запуска сервера.
 */
app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});

