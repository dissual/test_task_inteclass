import jwt from 'jsonwebtoken';

/**
 * Middleware для проверки JWT-аутентификации
 * @module checkAuth
 * @param {import('express').Request} req - Объект запроса Express
 * @param {import('express').Response} res - Объект ответа Express
 * @param {import('express').NextFunction} next - Функция перехода к следующему middleware
 * @returns {void} 
 * 
 * @example
 * // Использование в роуте:
 * router.get('/protected-route', checkAuth, (req, res) => {...})
 */
export default (req, res, next) => {
    // Извлекаем токен из заголовка Authorization
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            // Верифицируем токен с использованием секретного ключа
            const decoded = jwt.verify(token, 'secret123');

            // Добавляем ID пользователя в объект запроса
            req.userId = decoded._id;
            next();
        } catch (e) {
            // Обработка ошибок верификации токена
            return res.status(403).json({ 
                message: 'Нет доступа',
            });
        }
    } else {
        // Если токен отсутствует
        return res.status(403).json({ 
            message: 'Нет доступа',
        });
    }
};