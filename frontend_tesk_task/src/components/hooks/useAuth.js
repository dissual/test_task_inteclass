import { useState, useEffect } from 'react';
import { $api } from '../../api';

/**
 * Кастомный хук для управления состоянием аутентификации
 * @function
 * @returns {Object} Объект с данными пользователя и состоянием загрузки
 * @property {Object|null} user - Данные авторизованного пользователя (null если не авторизован)
 * @property {boolean} isLoading - Флаг состояния загрузки
 *
 * @example
 * // Пример использования в компоненте:
 * const { user, isLoading } = useAuth();
 * 
 * if (isLoading) return <Loader />;
 * if (!user) return <Navigate to="/login" />;
 * 
 * return <Dashboard user={user} />;
 *
 * @description
 * Хук useAuth выполняет:
 * 1. Проверку статуса аутентификации при монтировании компонента
 * 2. Запрос к API для получения данных пользователя
 * 3. Управление состояниями загрузки и данных пользователя
 */
export const useAuth = () => {
  /**
   * Состояние данных пользователя
   * @type {[Object|null, Function]}
   */
  const [user, setUser] = useState(null);

  /**
   * Состояние загрузки
   * @type {[boolean, Function]}
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Эффект для проверки аутентификации
   * @effect
   * @listens []
   */
  useEffect(() => {
    /**
     * Асинхронная функция проверки аутентификации
     * @async
     */
    const checkAuth = async () => {
      try {
        const { data } = await $api.getMe();
        setUser(data);
      } catch (err) {
        console.log('Пользователь не авторизован');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, isLoading };
};