import { validationResult } from 'express-validator';

/**
 * Middleware для обработки ошибок валидации
 * @module handleValidationErrors
 * @param {import('express').Request} req - Объект запроса Express
 * @param {import('express').Response} res - Объект ответа Express
 * @param {import('express').NextFunction} next - Функция перехода к следующему middleware
 * @returns {void|import('express').Response} Возвращает ответ с ошибками или передает управление дальше
 * 
 * @example
 * // Использование в роуте:
 * router.post('/login', loginValidation, handleValidationErrors, (req, res) => {...})
 */
export default (req, res, next) => {
    // Получаем результаты валидации из запроса
    const errors = validationResult(req);
    
    // Если есть ошибки валидации
    if (!errors.isEmpty()) {
        // Возвращаем статус 400 с массивом ошибок
        return res.status(400).json(errors.array());
    }

    // Если ошибок нет, передаем управление следующему middleware/роуту
    next();
};