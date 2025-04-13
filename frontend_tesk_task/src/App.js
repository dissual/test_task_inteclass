import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreateArticle from './components/Article/CreateArticle';
import './App.css';

/**
 * Главный компонент приложения, содержащий маршрутизацию
 * @component
 * @returns {JSX.Element} Возвращает JSX-разметку приложения с роутингом
 * 
 * @example
 * // Использование в index.js:
 * import App from './App';
 * 
 * ReactDOM.createRoot(document.getElementById('root')).render(<App />);
 * 
 * @description
 * Этот компонент:
 * 1. Инициализирует роутинг для всего приложения
 * 2. Содержит навигационную панель (Navbar)
 * 3. Определяет основные маршруты:
 *    - Главная страница (/)
 *    - Страница входа (/login)
 *    - Страница регистрации (/register)
 *    - Страница создания статьи (/create-article)
 */
function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-article" element={<CreateArticle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;