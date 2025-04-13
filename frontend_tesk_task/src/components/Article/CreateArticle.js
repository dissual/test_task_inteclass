import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Стили компонента
 * @type {Object}
 * @property {Object} container - Стили основного контейнера
 * @property {Object} header - Стили заголовка
 * @property {Object} input - Стили поля ввода заголовка
 * @property {Object} editorContainer - Стили контейнера редактора
 * @property {Object} tabContainer - Стили контейнера вкладок
 * @property {Object} tab - Стили вкладки
 * @property {Object} activeTab - Стили активной вкладки
 * @property {Object} imageButton - Стили кнопки загрузки изображения
 * @property {Object} preview - Стили области предпросмотра
 * @property {Object} textarea - Стили текстового редактора
 * @property {Object} imagePreview - Стили превью изображения
 * @property {Object} image - Стили изображения
 * @property {Object} buttonContainer - Стили контейнера кнопок
 * @property {Object} submitButton - Стили кнопки отправки
 * @property {Object} removeImageButton - Стили кнопки удаления изображения
 */
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '25px',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.1)'
  },
  // ... остальные стили
};

/**
 * Компонент для создания новых статей с Markdown-редактором
 * @component
 * @returns {JSX.Element} Возвращает разметку редактора статей
 *
 * @example
 * // Пример использования:
 * <CreateArticle />
 *
 * @description
 * Этот компонент предоставляет:
 * 1. Редактор статей с поддержкой Markdown
 * 2. Режим предпросмотра с рендерингом Markdown
 * 3. Загрузку изображений
 * 4. Валидацию обязательных полей
 */
export default function CreateArticle() {
  /**
   * Состояние заголовка статьи
   * @type {[string, Function]}
   */
  const [title, setTitle] = useState('');

  /**
   * Состояние содержимого статьи (Markdown)
   * @type {[string, Function]}
   */
  const [content, setContent] = useState('');

  /**
   * Флаг режима предпросмотра
   * @type {[boolean, Function]}
   */
  const [preview, setPreview] = useState(false);

  /**
   * Состояние загруженного изображения
   * @type {[File|null, Function]}
   */
  const [image, setImage] = useState(null);

  /**
   * Ref для скрытого input файла
   * @type {React.RefObject<HTMLInputElement>}
   */
  const fileInputRef = useRef(null);

  /**
   * Обработчик отправки формы
   * @param {React.FormEvent} e - Событие формы
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    console.log('Статья:', { title, content, image });
  };

  /**
   * Обработчик клика по кнопке загрузки изображения
   */
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Новая статья</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок статьи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        
        <div style={styles.editorContainer}>
          <div style={styles.tabContainer}>
            <button 
              type="button" 
              onClick={() => setPreview(false)}
              style={{ ...styles.tab, ...(!preview ? styles.activeTab : {}) }}
            >
              Редактор
            </button>
            <button 
              type="button" 
              onClick={() => setPreview(true)}
              style={{ ...styles.tab, ...(preview ? styles.activeTab : {}) }}
            >
              Предпросмотр
            </button>
            <button
              type="button"
              onClick={handleImageUpload}
              style={styles.imageButton}
            >
              Загрузить изображение
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          
          {preview ? (
            <div style={styles.preview}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              {image && (
                <div style={styles.imagePreview}>
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Превью" 
                    style={styles.image}
                  />
                  <p>{image.name}</p>
                </div>
              )}
            </div>
          ) : (
            <textarea
              placeholder="Напишите вашу статью в формате Markdown..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={styles.textarea}
            />
          )}
        </div>
        
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitButton}>
            Опубликовать
          </button>
          {image && (
            <button 
              type="button" 
              onClick={() => setImage(null)}
              style={styles.removeImageButton}
            >
              Удалить изображение
            </button>
          )}
        </div>
      </form>
    </div>
  );
}