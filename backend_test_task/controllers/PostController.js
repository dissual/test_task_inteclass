import PostModel from '../models/Post.js';

/**
 * Контроллер для работы с постами
 * @namespace PostController
 */

/**
 * Получение всех постов с информацией об авторах
 * @async
 * @function getAll
 * @memberof PostController
 * @param {import('express').Request} req - Объект запроса
 * @param {import('express').Response} res - Объект ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // Пример успешного ответа:
 * [
 *   {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "title": "Заголовок статьи",
 *     "text": "Текст статьи...",
 *     "user": {
 *       "_id": "507f1f77bcf86cd799439012",
 *       "fullName": "Иван Иванов"
 *     },
 *     "viewsCount": 100,
 *     "createdAt": "2023-01-01T00:00:00.000Z"
 *   }
 * ]
 */
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        });
    }
};

/**
 * Получение конкретного поста с увеличением счетчика просмотров
 * @async
 * @function getOne
 * @memberof PostController
 * @param {import('express').Request} req - Объект запроса (с параметром id)
 * @param {import('express').Response} res - Объект ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // Пример успешного ответа:
 * {
 *   "_id": "507f1f77bcf86cd799439011",
 *   "title": "Заголовок статьи",
 *   "text": "Текст статьи...",
 *   "viewsCount": 101,
 *   "user": "507f1f77bcf86cd799439012",
 *   "createdAt": "2023-01-01T00:00:00.000Z"
 * }
 */
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );

        if (!doc) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json(doc);
    } catch (err) {
        console.error('Ошибка получения статьи:', err.message);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

/**
 * Удаление поста
 * @async
 * @function remove
 * @memberof PostController
 * @param {import('express').Request} req - Объект запроса (с параметром id)
 * @param {import('express').Response} res - Объект ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // Пример успешного ответа:
 * {
 *   "success": true
 * }
 */
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findByIdAndDelete(postId);

        if (!doc) {
            return res.status(404).json({
                message: 'Не удалось найти статью',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.error('Ошибка удаления статьи:', err.message);
        res.status(500).json({
            message: 'Не удалось удалить статью',
        });
    }
};

/**
 * Создание нового поста
 * @async
 * @function create
 * @memberof PostController
 * @param {import('express').Request} req - Объект запроса (должен содержать userId в middleware)
 * @param {import('express').Response} res - Объект ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // Пример тела запроса:
 * {
 *   "title": "Новый пост",
 *   "text": "Содержание поста...",
 *   "tags": ["технологии", "программирование"],
 *   "imageUrl": "https://example.com/image.jpg"
 * }
 */
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        
        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

/**
 * Обновление существующего поста
 * @async
 * @function update
 * @memberof PostController
 * @param {import('express').Request} req - Объект запроса (с параметром id и userId в middleware)
 * @param {import('express').Response} res - Объект ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // Пример тела запроса:
 * {
 *   "title": "Обновленный заголовок",
 *   "text": "Новое содержание...",
 *   "tags": ["обновление", "информация"],
 *   "imageUrl": "https://example.com/new-image.jpg"
 * }
 */
export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            }, 
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};