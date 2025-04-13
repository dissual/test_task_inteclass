import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

/**
 * Контроллер для регистрации нового пользователя
 * @async
 * @function register
 * @param {import('express').Request} req - Объект запроса
 * @param {import('express').Response} res - Объект ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // Пример тела запроса:
 * {
 *   "email": "user@example.com",
 *   "password": "securePassword123",
 *   "fullName": "Иван Иванов",
 *   "avatarUrl": "https://example.com/avatar.jpg" // опционально
 * }
 */
export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });
    
        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;
    
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

/**
 * Контроллер для входа пользователя
 * @async
 * @function login
 * @param {import('express').Request} req - Объект запроса
 * @param {import('express').Response} res - Объект ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // Пример тела запроса:
 * {
 *   "email": "user@example.com",
 *   "password": "securePassword123"
 * }
 */
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ 
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass){
            return res.status(402).json({ 
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;
    
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

/**
 * Контроллер для получения информации о текущем пользователе
 * @async
 * @function getMe
 * @param {import('express').Request} req - Объект запроса (должен содержать userId в middleware)
 * @param {import('express').Response} res - Объект ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // Пример успешного ответа:
 * {
 *   "_id": "507f1f77bcf86cd799439011",
 *   "email": "user@example.com",
 *   "fullName": "Иван Иванов",
 *   "avatarUrl": "https://example.com/avatar.jpg",
 *   "createdAt": "2023-01-01T00:00:00.000Z",
 *   "updatedAt": "2023-01-01T00:00:00.000Z"
 * }
 */
export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        const { passwordHash, ...userData } = user._doc;
    
        res.json({...userData});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};