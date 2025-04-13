import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Стили компонента Register
 * @type {Object}
 * @property {Object} container - Стили основного контейнера формы
 * @property {Object} header - Стили заголовка формы
 * @property {Object} formGroup - Стили группы полей формы
 * @property {Object} label - Стили меток полей ввода
 * @property {Object} input - Стили полей ввода
 * @property {Object} submitButton - Стили кнопки отправки формы
 * @property {Object} footer - Стили нижнего блока формы
 * @property {Object} link - Стили ссылки в нижнем блоке
 * @property {Object} error - Стили сообщения об ошибке
 * @property {Object} success - Стили сообщения об успехе
 */
const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  // ... остальные стили
};

/**
 * Компонент страницы регистрации
 * @component
 * @returns {JSX.Element} Возвращает разметку формы регистрации
 *
 * @example
 * // Пример использования в роутинге:
 * <Route path="/register" element={<Register />} />
 *
 * @description
 * Компонент Register предоставляет:
 * 1. Форму регистрации с полями:
 *    - Имя пользователя
 *    - Email
 *    - Пароль
 *    - Подтверждение пароля
 * 2. Валидацию полей:
 *    - Проверка заполненности всех полей
 *    - Сравнение паролей
 *    - Минимальная длина пароля (6 символов)
 * 3. Обработку ошибок и успешной регистрации
 * 4. Ссылку на страницу входа
 */
export default function Register() {
  /**
   * Состояние имени пользователя
   * @type {[string, Function]}
   */
  const [username, setUsername] = useState('');

  /**
   * Состояние email пользователя
   * @type {[string, Function]}
   */
  const [email, setEmail] = useState('');

  /**
   * Состояние пароля пользователя
   * @type {[string, Function]}
   */
  const [password, setPassword] = useState('');

  /**
   * Состояние подтверждения пароля
   * @type {[string, Function]}
   */
  const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * Состояние ошибки формы
   * @type {[string, Function]}
   */
  const [error, setError] = useState('');

  /**
   * Состояние успешного сообщения
   * @type {[string, Function]}
   */
  const [success, setSuccess] = useState('');

  /**
   * Обработчик отправки формы регистрации
   * @param {React.FormEvent} e - Событие формы
   * @returns {void}
   *
   * @description
   * Выполняет:
   * 1. Предотвращение стандартного поведения формы
   * 2. Валидацию полей:
   *    - Проверка заполненности
   *    - Сравнение паролей
   *    - Проверка длины пароля
   * 3. Логирование данных (временная реализация)
   * 4. Установку сообщений об ошибке/успехе
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      setError('Заполните все поля');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }
    
    console.log('Регистрация:', { username, email, password });
    setError('');
    setSuccess('Регистрация прошла успешно!');
    // Здесь будет запрос к API
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Создать аккаунт</h2>
      
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            style={styles.input}
            placeholder="Придумайте логин"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            style={styles.input}
            placeholder="your@email.com"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            style={styles.input}
            placeholder="••••••••"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Подтвердите пароль</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError('');
            }}
            style={styles.input}
            placeholder="••••••••"
          />
        </div>
        
        <button type="submit" style={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>
      
      <div style={styles.footer}>
        Уже есть аккаунт? <Link to="/login" style={styles.link}>Войдите</Link>
      </div>
    </div>
  );
}