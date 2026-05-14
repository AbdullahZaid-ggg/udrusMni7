import { useMemo } from 'react';
import '../../styles/analytics.css';

export default function Analytics({ sessions = [], exams = [] }) {
  const weeklyData = useMemo(() => {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    return days.map((day, i) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      const dayEnd = new Date(dayDate);
      dayEnd.setHours(23, 59, 59, 999);

      const dayMinutes = sessions
        .filter(s => {
          const sessionDate = new Date(s.date);
          return sessionDate >= dayDate && sessionDate <= dayEnd;
        })
        .reduce((sum, s) => sum + s.duration, 0);

      return { day, hours: dayMinutes / 60 };
    });
  }, [sessions]);

  const maxHours = Math.max(...weeklyData.map(d => d.hours), 1);

  const overview = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(now.getDate() - now.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const monthSessions = sessions.filter(s => {
      const d = new Date(s.date);
      return d >= monthStart && d <= monthEnd;
    });

    const weekSessions = sessions.filter(s => {
      const d = new Date(s.date);
      return d >= thisWeekStart && d <= now;
    });

    const monthMinutes = monthSessions.reduce((sum, s) => sum + s.duration, 0);
    const weekMinutes = weekSessions.reduce((sum, s) => sum + s.duration, 0);

    const activeSubjects = new Set();
    sessions.forEach(s => {
      if (s.examId) activeSubjects.add(s.examId.toString());
    });

    const totalHoursAll = sessions.reduce((sum, s) => sum + s.duration, 0) / 60;

    return {
      monthHours: Math.floor(monthMinutes / 60),
      weekHours: Math.floor(weekMinutes / 60),
      weekMinutes: weekMinutes % 60,
      activeSubjects: activeSubjects.size,
      totalHours: Math.floor(totalHoursAll),
      totalSessions: sessions.length,
    };
  }, [sessions]);

  const examProgress = useMemo(() => {
    return exams.map(exam => {
      const examSessions = sessions.filter(
        s => s.examId?.toString() === exam.id?.toString()
      );
      const minutes = examSessions.reduce((sum, s) => sum + s.duration, 0);
      const hours = Math.round(minutes / 60 * 10) / 10;
      const target = exam.targetHours || 10;
      return { subject: exam.name, current: hours, target };
    });
  }, [exams, sessions]);

  const totalMinutesAll = sessions.reduce((sum, s) => sum + s.duration, 0);
  const avgMinutesPerSession = sessions.length > 0
    ? Math.round(totalMinutesAll / sessions.length)
    : 0;

  return (
    <div className="analytics">
      <h2>التحليلات والإحصائيات</h2>

      <section className="analytics-overview">
        <h3>نظرة عامة</h3>
        <div className="overview-cards">
          <div className="overview-card">
            <span className="overview-number">{overview.monthHours}</span>
            <span className="overview-label">ساعات هذا الشهر</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">{overview.totalSessions}</span>
            <span className="overview-label">إجمالي الجلسات</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">{overview.activeSubjects}</span>
            <span className="overview-label">المواد النشطة</span>
          </div>
        </div>
        <div className="overview-cards secondary">
          <div className="overview-card">
            <span className="overview-number">{overview.totalHours}</span>
            <span className="overview-label">إجمالي الساعات</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">{avgMinutesPerSession}</span>
            <span className="overview-label">متوسط الدقائق/جلسة</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">
              {overview.weekHours}:{overview.weekMinutes.toString().padStart(2, '0')}
            </span>
            <span className="overview-label">هذا الأسبوع</span>
          </div>
        </div>
      </section>

      <section className="analytics-weekly">
        <h3>ساعات الدراسة هذا الأسبوع</h3>
        <div className="weekly-chart">
          {weeklyData.map((day, index) => (
            <div key={index} className="chart-bar">
              <div 
                className="bar" 
                style={{ height: `${(day.hours / maxHours) * 100}%` }}
              >
                <span className="bar-value">{day.hours.toFixed(1)}h</span>
              </div>
              <span className="bar-label">{day.day}</span>
            </div>
          ))}
        </div>
      </section>

      {examProgress.length > 0 && (
        <section className="analytics-progress">
          <h3>مقارنة التقدم حسب المادة</h3>
          <div className="progress-comparison">
            {examProgress.map((item, index) => (
              <div key={index} className="comparison-item">
                <div className="comparison-header">
                  <span>{item.subject}</span>
                  <span>{item.current}س / {item.target}س</span>
                </div>
                <div className="comparison-bars">
                  <div className="bar-current">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {sessions.length === 0 && (
        <div className="empty-state">
          لا توجد بيانات بعد. ابدأ باستخدام المؤقت لتسجيل جلسات الدراسة.
        </div>
      )}
    </div>
  );
}