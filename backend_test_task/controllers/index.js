/**
 * Основные контроллеры API
 * @namespace Controllers
 * @description Экспорт всех контроллеров приложения
 */

/**
 * Контроллеры для работы с пользователями
 * @memberof Controllers
 * @name UserController
 * @see {@link module:UserController} Подробная документация UserController
 * @example
 * // Пример использования:
 * import { UserController } from './controllers';
 * router.post('/register', UserController.register);
 */

/**
 * Контроллеры для работы с постами
 * @memberof Controllers
 * @name PostController
 * @see {@link module:PostController} Подробная документация PostController
 * @example
 * // Пример использования:
 * import { PostController } from './controllers';
 * router.get('/posts', PostController.getAll);
 */
export * as UserController from './UserController.js';
export * as PostController from './PostController.js';