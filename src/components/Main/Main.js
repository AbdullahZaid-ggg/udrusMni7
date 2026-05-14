import { useMemo } from 'react';
import '../../styles/main.css';

const quotes = [
  '"التعليم هو السلاح الأقوى الذي يمكنك استخدامه لتغيير العالم"',
  '"العلم نور والجهل ظلام"',
  '"اطلب العلم من المهد إلى اللحد"',
  '"بالعلم ترتفع الأمم"',
  '"خير جليس في الزمان كتاب"',
  '"ما نتعلمه بالمهد يبقى حتى اللحد"',
];

export default function Main({ sessions = [], exams = [], onNavigate }) {
  const dailyQuote = useMemo(() => {
    const dayIndex = new Date().getDate() % quotes.length;
    return quotes[dayIndex];
  }, []);

  const todayStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const todaySessions = sessions.filter(s => {
      const d = new Date(s.date);
      return d >= today && d <= endOfToday;
    });

    const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);

    return {
      sessions: todaySessions.length,
      minutes: todayMinutes,
      hours: Math.floor(todayMinutes / 60),
      mins: todayMinutes % 60,
    };
  }, [sessions]);

  const weekStats = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const weekSessions = sessions.filter(s => {
      const d = new Date(s.date);
      return d >= startOfWeek && d <= now;
    });

    const totalMinutes = weekSessions.reduce((sum, s) => sum + s.duration, 0);
    return {
      sessions: weekSessions.length,
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
    };
  }, [sessions]);

  const totalHours = useMemo(() => {
    const minutes = sessions.reduce((sum, s) => sum + s.duration, 0);
    return Math.floor(minutes / 60);
  }, [sessions]);

  const recentSessions = useMemo(() => {
    return [...sessions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  }, [sessions]);

  const getExamName = (examId) => {
    const exam = exams.find(e => e.id?.toString() === examId?.toString());
    return exam?.name || 'عام';
  };

  return (
    <main className="main">
      <section className="main-hero">
        <div className="main-hero-content">
          <h2>مرحباً بك في ادرس منيح👋</h2>
        </div>
      </section>

      <section className="main-quote-section">
        <blockquote className="main-quote">{dailyQuote}</blockquote>
      </section>

      <section className="main-stats-grid">
        <div className="stat-card highlight">
          <span className="stat-icon">📚</span>
          <div className="stat-body">
            <span className="stat-value">{exams.length}</span>
            <span className="stat-label">المواد</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏱️</span>
          <div className="stat-body">
            <span className="stat-value">{weekStats.hours}h</span>
            <span className="stat-label">هذا الأسبوع</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div className="stat-body">
            <span className="stat-value">{totalHours}h</span>
            <span className="stat-label">الإجمالي</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div className="stat-body">
            <span className="stat-value">{sessions.length}</span>
            <span className="stat-label">جلسة</span>
          </div>
        </div>
      </section>

      <section className="main-today">
        <h3>اليوم</h3>
        {todayStats.sessions > 0 ? (
          <div className="today-summary">
            <span className="today-emoji">🎯</span>
            <span className="today-text">
              {todayStats.hours > 0
                ? `${todayStats.hours}h ${todayStats.mins}m`
                : `${todayStats.minutes}m`}{' '}
              دراسة في {todayStats.sessions} جلس{todayStats.sessions > 1 ? 'ات' : 'ة'}
            </span>
          </div>
        ) : (
          <div className="today-empty">
            <span>لم تسجل أي جلسة اليوم. ابدأ الآن! 🚀</span>
          </div>
        )}
      </section>

      {recentSessions.length > 0 && (
        <section className="main-recent">
          <h3>آخر الجلسات</h3>
          <div className="recent-list">
            {recentSessions.map(s => (
              <div key={s.id} className="recent-item">
                <span className="recent-exam">{getExamName(s.examId)}</span>
                <span className="recent-duration">{s.duration} د</span>
                <span className="recent-date">
                  {new Date(s.date).toLocaleDateString('ar-SA', {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="main-quick-nav">
        <h3>ابدأ من هنا</h3>
        <div className="quick-nav-grid">
          <button className="quick-nav-card" onClick={() => onNavigate?.('timer')}>
            <span className="quick-icon">⏱️</span>
            <span className="quick-title">مؤقت دراسة</span>
            <span className="quick-desc">ابدأ جلسة تركيز</span>
          </button>
          <button className="quick-nav-card" onClick={() => onNavigate?.('taqadom')}>
            <span className="quick-icon">📈</span>
            <span className="quick-title">التقدم</span>
            <span className="quick-desc">تابع إنجازاتك</span>
          </button>
          <button className="quick-nav-card" onClick={() => onNavigate?.('exams')}>
            <span className="quick-icon">📚</span>
            <span className="quick-title">المواد</span>
            <span className="quick-desc">تصفح المواد الدراسية</span>
          </button>
          <button className="quick-nav-card" onClick={() => onNavigate?.('analytics')}>
            <span className="quick-icon">📊</span>
            <span className="quick-title">التحليلات</span>
            <span className="quick-desc">إحصائياتك التفصيلية</span>
          </button>
        </div>
      </section>
    </main>
  );
}