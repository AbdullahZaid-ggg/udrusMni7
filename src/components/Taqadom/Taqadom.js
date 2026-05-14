import { useState, useMemo } from 'react';
import '../../styles/taqadom.css';

const VIEW_DAILY = 'daily';
const VIEW_WEEKLY = 'weekly';
const VIEW_MONTHLY = 'monthly';
const VIEW_YEARLY = 'yearly';

export default function Taqadom({ sessions, exams, onDeleteSession }) {
  const [view, setView] = useState(VIEW_WEEKLY);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingSession, setEditingSession] = useState(null);

  const navigate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === VIEW_DAILY) {
      newDate.setDate(newDate.getDate() + direction);
    } else if (view === VIEW_WEEKLY) {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else if (view === VIEW_MONTHLY) {
      newDate.setMonth(newDate.getMonth() + direction);
    } else {
      newDate.setFullYear(newDate.getFullYear() + direction);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());

  const filteredSessions = useMemo(() => {
    const startOfView = new Date(currentDate);
    const endOfView = new Date(currentDate);

    if (view === VIEW_DAILY) {
      startOfView.setHours(0, 0, 0, 0);
      endOfView.setHours(23, 59, 59, 999);
    } else if (view === VIEW_WEEKLY) {
      const day = startOfView.getDay();
      startOfView.setDate(startOfView.getDate() - day);
      startOfView.setHours(0, 0, 0, 0);
      endOfView.setDate(startOfView.getDate() + 6);
      endOfView.setHours(23, 59, 59, 999);
    } else if (view === VIEW_MONTHLY) {
      startOfView.setDate(1);
      startOfView.setHours(0, 0, 0, 0);
      endOfView.setMonth(endOfView.getMonth() + 1, 0);
      endOfView.setHours(23, 59, 59, 999);
    } else {
      startOfView.setMonth(0, 1);
      startOfView.setHours(0, 0, 0, 0);
      endOfView.setMonth(11, 31);
      endOfView.setHours(23, 59, 59, 999);
    }

    return sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate >= startOfView && sessionDate <= endOfView;
    });
  }, [sessions, currentDate, view]);

  const groupedData = useMemo(() => {
    if (view === VIEW_DAILY) {
      return { [currentDate.toDateString()]: filteredSessions };
    } else if (view === VIEW_WEEKLY) {
      const groups = {};
      filteredSessions.forEach(s => {
        const date = new Date(s.date).toDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(s);
      });
      return groups;
    } else if (view === VIEW_MONTHLY) {
      const groups = {};
      filteredSessions.forEach(s => {
        const date = new Date(s.date);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(s);
      });
      return groups;
    } else {
      const groups = {};
      filteredSessions.forEach(s => {
        const year = new Date(s.date).getFullYear();
        if (!groups[year]) groups[year] = [];
        groups[year].push(s);
      });
      return groups;
    }
  }, [filteredSessions, view, currentDate]);

  const totals = useMemo(() => {
    return filteredSessions.reduce((acc, s) => {
      acc.totalSessions++;
      acc.totalMinutes += s.duration;
      return acc;
    }, { totalSessions: 0, totalMinutes: 0 });
  }, [filteredSessions]);

  const formatDateLabel = () => {
    if (view === VIEW_DAILY) {
      return currentDate.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } else if (view === VIEW_WEEKLY) {
      const start = new Date(currentDate);
      const day = start.getDay();
      start.setDate(start.getDate() - day);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else if (view === VIEW_MONTHLY) {
      return currentDate.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' });
    } else {
      return currentDate.getFullYear().toString();
    }
  };

  const getExamName = (examId) => {
    const exam = exams.find(e => e.id.toString() === examId?.toString());
    return exam?.name || 'عام';
  };

  return (
    <div className="taqadom">
      <div className="taqadom-header">
        <h2>التقدم والدراسة</h2>
        <div className="view-controls">
          <button className={view === VIEW_DAILY ? 'active' : ''} onClick={() => setView(VIEW_DAILY)}>يومي</button>
          <button className={view === VIEW_WEEKLY ? 'active' : ''} onClick={() => setView(VIEW_WEEKLY)}>أسبوعي</button>
          <button className={view === VIEW_MONTHLY ? 'active' : ''} onClick={() => setView(VIEW_MONTHLY)}>شهري</button>
          <button className={view === VIEW_YEARLY ? 'active' : ''} onClick={() => setView(VIEW_YEARLY)}>سنوي</button>
        </div>
      </div>

      <div className="taqadom-nav">
        <button onClick={() => navigate(-1)}>◀</button>
        <span className="current-date">{formatDateLabel()}</span>
        <button onClick={() => navigate(1)}>▶</button>
        <button className="today-btn" onClick={goToToday}>اليوم</button>
      </div>

      <div className="taqadom-summary">
        <div className="summary-card">
          <span className="summary-icon">📊</span>
          <div className="summary-content">
            <span className="summary-value">{totals.totalSessions}</span>
            <span className="summary-label">جلسات</span>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">⏱️</span>
          <div className="summary-content">
            <span className="summary-value">{Math.floor(totals.totalMinutes / 60)}س {totals.totalMinutes % 60}د</span>
            <span className="summary-label">إجمالي الوقت</span>
          </div>
        </div>
      </div>

      <div className="sessions-list">
        {Object.keys(groupedData).length === 0 ? (
          <div className="empty-state">لا توجد جلسات في هذه الفترة</div>
        ) : (
          Object.entries(groupedData).map(([key, group]) => (
            <div key={key} className="session-group">
              <div className="group-header">
                <span className="group-date">
                  {view === VIEW_YEARLY ? key : 
                   view === VIEW_MONTHLY ? new Date(key + '-01').toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' }) :
                   new Date(key).toLocaleDateString('ar-SA', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
                <span className="group-total">
                  {group.reduce((sum, s) => sum + s.duration, 0)} دقيقة
                </span>
              </div>
              <div className="group-sessions">
                {group.map((session) => (
                  <div key={session.id} className="session-item">
                    <div className="session-info">
                      <span className="session-icon">📚</span>
                      <div className="session-details">
                        <span className="session-exam">{getExamName(session.examId)}</span>
                        <span className="session-time">
                          {new Date(session.date).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <div className="session-duration">{session.duration} دقيقة</div>
                    <button 
                      className="delete-session-btn"
                      onClick={() => onDeleteSession(session.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}