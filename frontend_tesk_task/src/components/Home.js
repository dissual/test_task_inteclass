// Выносим стили в отдельный объект
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: '30px'
  },
  articlesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    marginTop: '30px'
  },
  articleCard: {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  articleImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  articleContent: {
    padding: '20px'
  },
  articleTitle: {
    margin: '0 0 10px 0',
    color: '#2E7D32',
    fontSize: '20px'
  },
  articleExcerpt: {
    color: '#666',
    margin: '0 0 15px 0',
    lineHeight: '1.5'
  },
  articleFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  articleDate: {
    color: '#888',
    fontSize: '14px'
  },
  readMoreButton: {
    background: 'none',
    border: '1px solid #4CAF50',
    color: '#4CAF50',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      background: '#4CAF50',
      color: 'white'
    }
  }
};

export default function Home() {
  const articles = [
    {
      id: 1,
      title: 'Как создать React-приложение',
      excerpt: 'Пошаговое руководство по настройке проекта',
      date: '15 мая 2024',
      image: 'https://via.placeholder.com/300x200?text=React'
    },
    {
      id: 2,
      title: 'Основы Markdown',
      excerpt: 'Все основные синтаксические элементы разметки',
      date: '10 мая 2024',
      image: 'https://via.placeholder.com/300x200?text=Markdown'
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Последние статьи</h1>
      
      <div style={styles.articlesContainer}>
        {articles.map(article => (
          <div key={article.id} style={styles.articleCard}>
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title} 
                style={styles.articleImage}
              />
            )}
            <div style={styles.articleContent}>
              <h3 style={styles.articleTitle}>{article.title}</h3>
              <p style={styles.articleExcerpt}>{article.excerpt}</p>
              <div style={styles.articleFooter}>
                <span style={styles.articleDate}>{article.date}</span>
                <button style={styles.readMoreButton}>Читать далее</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}