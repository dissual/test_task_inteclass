import { useState, useEffect } from 'react';

/**
 * Компонент для отображения списка статей
 * @component
 * @returns {JSX.Element} Возвращает разметку списка статей
 *
 * @example
 * // Пример использования:
 * <ArticleList />
 *
 * @description
 * Этот компонент:
 * 1. Загружает список статей при монтировании
 * 2. Отображает статьи в виде карточек
 * 3. Поддерживает состояние загрузки (в текущей реализации - моковые данные)
 */
export default function ArticleList() {
  /**
   * Состояние для хранения списка статей
   * @type {Array<{id: number, title: string, content: string}>}
   */
  const [articles, setArticles] = useState([]);

  /**
   * Эффект для загрузки статей при монтировании компонента
   * @hook
   * @effect
   */
  useEffect(() => {
    // Здесь будет запрос к API для получения статей
    // Временные данные для примера:
    setArticles([
      { id: 1, title: 'Первая статья', content: 'Текст первой статьи' },
      { id: 2, title: 'Вторая статья', content: 'Текст второй статьи' }
    ]);
  }, []);

  return (
    <div>
      <h2>Статьи</h2>
      {articles.map(article => (
        <div 
          key={article.id} 
          style={{ 
            marginBottom: '20px', 
            border: '1px solid #ccc', 
            padding: '10px' 
          }}
        >
          <h3>{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}