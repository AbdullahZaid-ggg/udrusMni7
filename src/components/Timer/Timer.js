import { useState, useEffect } from 'react';
import '../../styles/timer.css';

const DEFAULT_WORK_TIME = 25;
const DEFAULT_BREAK_TIME = 5;

export default function Timer({ exams, sessions, onSaveSession }) {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_WORK_TIME * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [selectedExam, setSelectedExam] = useState('');
  const [workMinutes, setWorkMinutes] = useState(DEFAULT_WORK_TIME);
  const [breakMinutes, setBreakMinutes] = useState(DEFAULT_BREAK_TIME);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        const session = {
          id: Date.now(),
          examId: selectedExam,
          examName: exams.find(e => e.id.toString() === selectedExam.toString())?.name || 'عام',
          duration: workMinutes,
          type: 'work',
          date: new Date().toISOString()
        };
        onSaveSession(session);
        setIsBreak(true);
        setTimeLeft(breakMinutes * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(workMinutes * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, workMinutes, breakMinutes, selectedExam, exams, onSaveSession]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakMinutes * 60 : workMinutes * 60);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setIsBreak(false);
    if (newMode === 'short') {
      setWorkMinutes(15);
      setTimeLeft(15 * 60);
    } else if (newMode === 'long') {
      setWorkMinutes(50);
      setTimeLeft(50 * 60);
    } else {
      setWorkMinutes(25);
      setTimeLeft(25 * 60);
    }
  };

  const handleSaveSettings = () => {
    setShowSettings(false);
    if (!isRunning) {
      setTimeLeft(isBreak ? breakMinutes * 60 : workMinutes * 60);
    }
  };

  return (
    <div className="timer">
      <h2>المؤقت</h2>
      
      <div className="timer-modes">
        <button 
          className={mode === 'pomodoro' ? 'active' : ''} 
          onClick={() => handleModeChange('pomodoro')}
        >
          بومودورو
        </button>
        <button 
          className={mode === 'short' ? 'active' : ''} 
          onClick={() => handleModeChange('short')}
        >
          قصير
        </button>
        <button 
          className={mode === 'long' ? 'active' : ''} 
          onClick={() => handleModeChange('long')}
        >
          طويل
        </button>
        <button className="settings-btn" onClick={() => setShowSettings(true)}>
          ⚙️
        </button>
      </div>

      <div className={`timer-display ${isBreak ? 'break' : 'work'}`}>
        <div className="timer-icon">{isBreak ? '☕' : '📚'}</div>
        <div className="timer-time">{formatTime(timeLeft)}</div>
        <div className="timer-label">{isBreak ? 'استراحة' : 'تركيز'}</div>
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button className="start-btn" onClick={handleStart}>▶️ بدء</button>
        ) : (
          <button className="pause-btn" onClick={handlePause}>⏸️ إيقاف</button>
        )}
        <button className="reset-btn" onClick={handleReset}>🔄 إعادة</button>
      </div>

      <div className="timer-exam-select">
        <label>ربط بامتحان:</label>
        <select 
          value={selectedExam} 
          onChange={(e) => setSelectedExam(e.target.value)}
          disabled={isRunning}
        >
          <option value="">اختر امتحان...</option>
          {exams.map(exam => (
            <option key={exam.id} value={exam.id}>{exam.name}</option>
          ))}
        </select>
      </div>

      <div className="timer-stats">
        <div className="stat">
          <span className="stat-label">وقت العمل</span>
          <span className="stat-value">{workMinutes} دقيقة</span>
        </div>
        <div className="stat">
          <span className="stat-label">وقت الاستراحة</span>
          <span className="stat-value">{breakMinutes} دقيقة</span>
        </div>
      </div>

      {showSettings && (
        <div className="settings-overlay">
          <div className="settings-dialog">
            <h3>إعدادات المؤقت</h3>
            <div className="setting-row">
              <label>وقت العمل (دقائق)</label>
              <input 
                type="number" 
                value={workMinutes} 
                onChange={(e) => setWorkMinutes(parseInt(e.target.value) || 25)}
                min="1"
                max="120"
              />
            </div>
            <div className="setting-row">
              <label>وقت الاستراحة (دقائق)</label>
              <input 
                type="number" 
                value={breakMinutes} 
                onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 5)}
                min="1"
                max="60"
              />
            </div>
            <div className="settings-actions">
              <button className="save-btn" onClick={handleSaveSettings}>حفظ</button>
              <button className="cancel-btn" onClick={() => setShowSettings(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}