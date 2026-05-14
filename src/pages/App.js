import '../styles/app.css';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Main from '../components/Main';
import About from '../components/About';
import Analytics from '../components/Analytics';
import Exams from '../components/Exams';
import Timer from '../components/Timer/Timer';
import Taqadom from '../components/Taqadom/Taqadom';
import Footer from '../components/Footer';

const STORAGE_KEY_EXAMS = 'studyapp_exams';
const STORAGE_KEY_SESSIONS = 'studyapp_sessions';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EXAMS);
    return saved ? JSON.parse(saved) : getDefaultExams(saved);
  });

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
    return saved ? JSON.parse(saved) : [];
  });

  function getDefaultExams(saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
    return [];
  }

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSaveExam = (examData) => {
    if (examData.id) {
      setExams(exams.map(e => e.id === examData.id ? { ...examData, id: examData.id } : e));
    } else {
      setExams([...exams, { ...examData, id: Date.now() }]);
    }
  };

  const handleDeleteExam = (id) => {
    setExams(exams.filter(e => e.id !== id));
  };

  const handleSaveSession = (session) => {
    setSessions([...sessions, session]);
  };

  const handleDeleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div className="App">
      <div className="app-sidebar">
        <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        <Nav currentPage={currentPage} onNavigate={setCurrentPage} />
        <Footer />
      </div>
      <div className="app-content">
        {currentPage === 'home' && <Main />}
        {currentPage === 'exams' && (
          <Exams 
            exams={exams} 
            onSaveExam={handleSaveExam} 
            onDeleteExam={handleDeleteExam} 
          />
        )}
        {currentPage === 'timer' && (
          <Timer 
            exams={exams}
            sessions={sessions}
            onSaveSession={handleSaveSession}
          />
        )}
        {currentPage === 'taqadom' && (
          <Taqadom 
            sessions={sessions}
            exams={exams}
            onDeleteSession={handleDeleteSession}
          />
        )}
        {currentPage === 'analytics' && <Analytics />}
        {currentPage === 'about' && <About />}
      </div>
    </div>
  );
}

export default App;