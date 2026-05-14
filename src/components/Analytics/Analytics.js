import '../../styles/analytics.css';

export default function Analytics() {
  const weeklyData = [
    { day: 'الإثنين', hours: 2 },
    { day: 'الثلاثاء', hours: 3 },
    { day: 'الأربعاء', hours: 1.5 },
    { day: 'الخميس', hours: 4 },
    { day: 'الجمعة', hours: 2.5 },
    { day: 'السبت', hours: 3 },
    { day: 'الأحد', hours: 2 },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const monthlyProgress = [
    { subject: 'الرياضيات', current: 75, target: 80 },
    { subject: 'الفيزياء', current: 60, target: 70 },
    { subject: 'العربية', current: 85, target: 90 },
    { subject: 'الإنجليزية', current: 50, target: 65 },
  ];

  return (
    <div className="analytics">
      <h2>التحليلات والإحصائيات</h2>

      <section className="analytics-overview">
        <h3>نظرة عامة</h3>
        <div className="overview-cards">
          <div className="overview-card">
            <span className="overview-number">18</span>
            <span className="overview-label">ساعات هذا الشهر</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">68%</span>
            <span className="overview-label">متوسط التقدم</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">4</span>
            <span className="overview-label">المواد النشطة</span>
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
                <span className="bar-value">{day.hours}h</span>
              </div>
              <span className="bar-label">{day.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="analytics-progress">
        <h3>مقارنة التقدم</h3>
        <div className="progress-comparison">
          {monthlyProgress.map((item, index) => (
            <div key={index} className="comparison-item">
              <div className="comparison-header">
                <span>{item.subject}</span>
                <span>{item.current}% / {item.target}%</span>
              </div>
              <div className="comparison-bars">
                <div className="bar-current">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${item.current}%` }}
                  />
                </div>
                <div className="bar-target">
                  <div 
                    className="bar-fill target" 
                    style={{ width: `${item.target}%` }}
                  />
                </div>
              </div>
              <div className="comparison-labels">
                <span>الحالي</span>
                <span>الهدف</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}