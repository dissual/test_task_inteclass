import axios from 'axios';

/**
 * Базовый URL API
 * @constant {string}
 */
const API_URL = 'http://localhost:4444';

/**
 * Экземпляр axios с базовой конфигурацией
 * @type {AxiosInstance}
 * @property {string} baseURL - Базовый URL API
 * @property {boolean} withCredentials - Отправка cookies с запросами
 */
export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

/**
 * Интерцептор для добавления токена авторизации к каждому запросу
 * @function
 * @param {AxiosRequestConfig} config - Конфигурация запроса
 * @returns {AxiosRequestConfig} Обновленная конфигурация запроса
 */
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

/**
 * API клиент для работы с бэкендом
 * @namespace api
 */
export default {
  /**
   * Авторизация пользователя
   * @function
   * @param {string} email - Email пользователя
   * @param {string} password - Пароль
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  login: (email, password) => $api.post('/auth/login', { email, password }),

  /**
   * Регистрация нового пользователя
   * @function
   * @param {string} username - Имя пользователя
   * @param {string} email - Email
   * @param {string} password - Пароль
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  register: (username, email, password) => $api.post('/auth/register', { username, email, password }),

  /**
   * Получение данных текущего пользователя
   * @function
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  getMe: () => $api.get('/auth/me'),

  /**
   * Получение списка статей
   * @function
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  getPosts: () => $api.get('/posts'),

  /**
   * Получение конкретной статьи
   * @function
   * @param {string} id - ID статьи
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  getPost: (id) => $api.get(`/posts/${id}`),

  /**
   * Создание новой статьи
   * @function
   * @param {string} title - Заголовок статьи
   * @param {string} content - Содержание статьи
   * @param {string} [imageUrl] - URL изображения (опционально)
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  createPost: (title, content, imageUrl) => $api.post('/posts', { title, content, imageUrl }),

  /**
   * Обновление статьи
   * @function
   * @param {string} id - ID статьи
   * @param {string} title - Новый заголовок
   * @param {string} content - Новое содержание
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  updatePost: (id, title, content) => $api.patch(`/posts/${id}`, { title, content }),

  /**
   * Удаление статьи
   * @function
   * @param {string} id - ID статьи
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  deletePost: (id) => $api.delete(`/posts/${id}`),

  /**
   * Загрузка изображения на сервер
   * @function
   * @param {File} file - Файл изображения
   * @returns {Promise<AxiosResponse>} Ответ сервера
   */
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return $api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};