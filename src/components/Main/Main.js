import '../../styles/main.css';

export default function Main() {
  return (
    <main className="main">
      <div className="main-welcome">
        <h2>مرحباً بك</h2>
        <p className="main-quote">"التعليم هو السلاح الأقوى الذي يمكنك استخدامه لتغيير العالم"</p>
      </div>

      <div className="main-stats">
        <div className="stat-box">
          <span className="stat-icon">📚</span>
          <span className="stat-value">4</span>
          <span className="stat-name">مواد</span>
        </div>
        <div className="stat-box">
          <span className="stat-icon">⏱️</span>
          <span className="stat-value">12h</span>
          <span className="stat-name">هذا الأسبوع</span>
        </div>
        <div className="stat-box">
          <span className="stat-icon">📈</span>
          <span className="stat-value">68%</span>
          <span className="stat-name">تقدم</span>
        </div>
      </div>

      <div className="main-message">
        <p>استخدم القائمة الجانبية للتنقل بين الصفحات</p>
      </div>
    </main>
  );
}