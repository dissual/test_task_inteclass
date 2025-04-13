/**
 * Утилиты для работы с Express.js
 * @namespace utils
 * @description Набор вспомогательных middleware-функций для обработки аутентификации и валидации
 */

/**
 * Middleware для проверки JWT-аутентификации
 * @memberof utils
 * @name checkAuth
 * @see {@link module:checkAuth} Подробнее в checkAuth.js
 */

/**
 * Middleware для обработки ошибок валидации
 * @memberof utils
 * @name handleValidationErrors
 * @see {@link module:handleValidationErrors} Подробнее в handleValidationErrors.js
 */
export { default as checkAuth } from './checkAuth.js';
export { default as handleValidationErrors } from './handleValidationErrors.js';