import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Стили компонента Login
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
 * Компонент страницы входа в систему
 * @component
 * @returns {JSX.Element} Возвращает разметку формы входа
 *
 * @example
 * // Пример использования в роутинге:
 * <Route path="/login" element={<Login />} />
 *
 * @description
 * Компонент Login предоставляет:
 * 1. Форму входа с полями email и пароль
 * 2. Валидацию обязательных полей
 * 3. Обработку ошибок
 * 4. Ссылку на страницу регистрации
 */
export default function Login() {
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
   * Состояние ошибки формы
   * @type {[string, Function]}
   */
  const [error, setError] = useState('');

  /**
   * Обработчик отправки формы входа
   * @param {React.FormEvent} e - Событие формы
   * @returns {void}
   *
   * @description
   * Выполняет:
   * 1. Предотвращение стандартного поведения формы
   * 2. Базовую валидацию полей
   * 3. Логирование данных (временная реализация)
   * 4. Сброс ошибки при успешной валидации
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }
    console.log('Вход:', { email, password });
    // Здесь будет запрос к API
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Вход в аккаунт</h2>
      
      {error && <div style={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
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
        
        <button type="submit" style={styles.submitButton}>
          Войти
        </button>
      </form>
      
      <div style={styles.footer}>
        Нет аккаунта? <Link to="/register" style={styles.link}>Зарегистрируйтесь</Link>
      </div>
    </div>
  );
}