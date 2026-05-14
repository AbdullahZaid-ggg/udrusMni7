import '../../styles/nav.css';

export default function Nav({ currentPage, onNavigate }) {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <button 
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => onNavigate('home')}
          >
            الرئيسية
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={currentPage === 'exams' ? 'active' : ''}
            onClick={() => onNavigate('exams')}
          >
            الاختبارات
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={currentPage === 'timer' ? 'active' : ''}
            onClick={() => onNavigate('timer')}
          >
            المؤقت
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={currentPage === 'taqadom' ? 'active' : ''}
            onClick={() => onNavigate('taqadom')}
          >
            التقدم
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={currentPage === 'analytics' ? 'active' : ''}
            onClick={() => onNavigate('analytics')}
          >
            الإحصائيات
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={currentPage === 'about' ? 'active' : ''}
            onClick={() => onNavigate('about')}
          >
            حول
          </button>
        </li>
      </ul>
    </nav>
  );
}