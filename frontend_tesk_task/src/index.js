import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Корневой элемент DOM, в который будет отрендерено приложение
 * @type {ReactDOM.Root}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Инициализация и рендеринг React-приложения
 * @function
 * @description Главная точка входа в приложение. Рендерит корневой компонент App в режиме StrictMode
 * @see {@link https://reactjs.org/docs/strict-mode.html} О StrictMode
 * 
 * @example
 * // Стандартное использование:
 * // - Создает корневой DOM-узел
 * // - Рендерит приложение в режиме StrictMode
 * // - Подключает главный компонент App
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);