import { body } from 'express-validator';

/**
 * Валидация полей при логине
 * @type {import('express-validator').ValidationChain[]}
 */
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

/**
 * Валидация полей при регистрации
 * @type {import('express-validator').ValidationChain[]}
 */
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

/**
 * Валидация полей при создании поста
 * @type {import('express-validator').ValidationChain[]}
 */
export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];