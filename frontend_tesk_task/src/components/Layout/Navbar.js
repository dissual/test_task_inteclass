import { Link } from 'react-router-dom';

/**
 * Стили для навигационных ссылок
 * @constant {Object}
 * @property {string} color - Цвет текста
 * @property {string} textDecoration - Убрано подчеркивание
 * @property {string} margin - Внешние отступы
 * @property {string} padding - Внутренние отступы
 * @property {string} transition - Плавные переходы
 */
const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 15px',
  padding: '5px 10px',
  transition: 'all 0.3s ease'
};

/**
 * Компонент навигационной панели
 * @component
 * @returns {JSX.Element} Возвращает разметку навигационного меню
 *
 * @example
 * // Пример использования:
 * <Navbar />
 *
 * @description
 * Компонент Navbar предоставляет:
 * 1. Основную навигацию по приложению
 * 2. Ссылки на главные страницы:
 *    - Главная
 *    - Вход
 *    - Регистрация
 *    - Создание статьи (с особым стилем)
 * 3. Градиентный фон и стилизованные ссылки
 */
export default function Navbar() {
  return (
    <nav style={{ 
      background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      padding: '15px',
      color: 'white'
    }}>
      <Link to="/" style={navLinkStyle}>Главная</Link>
      <Link to="/login" style={navLinkStyle}>Вход</Link>
      <Link to="/register" style={navLinkStyle}>Регистрация</Link>
      <Link to="/create-article" style={{ 
        ...navLinkStyle,
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '20px'
      }}>Новая статья</Link>
    </nav>
  );
}