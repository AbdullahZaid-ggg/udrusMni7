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
import { examService, sessionService, migrateFromLocalStorage } from '../db';

const defaultExams = [
  { id: 1, name: 'الصف الأول المتوسط', icon: '📚', subjects: [{ name: 'الرياضيات', topics: ['العمليات الحسابية', 'الكسور', 'النسبة المئوية', 'المعادلات البسيطة', 'الهندسة'] }, { name: 'العلوم', topics: ['المادة والقياس', 'الحركة والقوة', 'الطاقة', 'الضوء والصوت', 'الحياة'] }, { name: 'اللغة العربية', topics: ['النحو والصرف', 'القراءة', 'التعبير', 'الإملاء', 'الأدب'] }, { name: 'الاجتماعيات', topics: ['الجغرافيا', 'التاريخ', 'الوطنية', 'الاقتصاد'] }] },
  { id: 2, name: 'الصف الثاني المتوسط', icon: '📖', subjects: [{ name: 'الرياضيات', topics: ['الجبر', 'المتباينات', 'الدوال', 'الإحصاء', 'المساحة'] }, { name: 'العلوم', topics: ['الخلية', 'الوراثة', 'البيئة', 'الكيمياء', 'الفيزياء'] }, { name: 'اللغة العربية', topics: ['النصوص', 'القواعد', 'الإنشاء', 'الشعر', 'النثر'] }, { name: 'الاجتماعيات', topics: ['تاريخ العالم', 'الجغرافيا', 'الحضارات', 'الأنظمة'] }] },
  { id: 3, name: 'الصف الثالث المتوسط', icon: '🎯', subjects: [{ name: 'الرياضيات', topics: ['المعادلات الخطية', 'التناسب', 'الإحصاء', 'الهندسة التحليلية', 'المجموعات'] }, { name: 'العلوم', topics: ['الطباعة', 'التكاثر', 'الوراثة', 'البيئة', 'الكهرومغناطيسية'] }, { name: 'اللغة العربية', topics: ['البلاغة', 'النقد', 'القواعد المتقدمة', 'الإماء', 'القراءة النقدية'] }] },
  { id: 4, name: 'الصف الأول الثانوي', icon: '🚀', subjects: [{ name: 'الرياضيات', topics: ['المجموعات', 'العلاقات والدوال', 'المتتاليات', 'الحدوديات', 'المصفوفات'] }, { name: 'الفيزياء', topics: ['الحركة', 'القوى', 'الطاقة', 'الشد والضغط', 'المد والجزر'] }, { name: 'الكيمياء', topics: ['المادة', 'الذرة', 'الجدول الدوري', 'الروابط', 'التحليل'] }, { name: 'الأحياء', topics: ['الخلية', 'الأنسجة', 'التنفس', 'التغذية', 'التكاثر'] }] },
  { id: 5, name: 'الصف الثاني الثانوي - العلمي', icon: '🔬', subjects: [{ name: 'الرياضيات', topics: ['التكامل', 'التفاضل', 'المعادلات التفاضلية', 'المثلثات', 'الإحصاء'] }, { name: 'الفيزياء', topics: ['الكهرومغناطيسية', 'البصريات', 'الصوت', 'الحرارة', 'ميكانيكا الكم'] }, { name: 'الكيمياء', topics: ['الحموض والقواعد', 'التأكسد والاختزال', 'الكيمياء العضوية', 'التحليل الكمي'] }, { name: 'الأحياء', topics: ['الوراثة', 'التطور', 'البيئة', 'التقنية الحيوية', 'علم الخلايا'] }] },
  { id: 6, name: 'الصف الثالث الثانوي - العلمي', icon: '🎓', subjects: [{ name: 'الرياضيات', topics: ['المصفوفات', 'المحددات', 'الهندسة الفضائية', 'المعادلات المركبة', 'الإحصاء المتقدم'] }, { name: 'الفيزياء', topics: ['النسبية', 'الفيزياء النووية', 'الجسيمات', 'الميكانيكا الإحصائية', 'الكهرومغناطيسية المتقدمة'] }, { name: 'الكيمياء', topics: ['الكيمياء الحيوية', 'الكيمياء الصناعية', 'التحليل الطيفي', 'الكيمياء التطبيقية'] }, { name: 'الأحياء', topics: ['التقنية الحيوية', 'الهندسة الوراثية', 'الطب', 'البيئة المتقدمة'] }] }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [exams, setExams] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      await migrateFromLocalStorage(defaultExams);
      const loadedExams = await examService.getAll();
      const loadedSessions = await sessionService.getAll();
      setExams(loadedExams);
      setSessions(loadedSessions);
      setIsLoading(false);
    };
    initData();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSaveExam = async (examData) => {
    if (examData.id) {
      await examService.update(examData);
    } else {
      await examService.add(examData);
    }
    const updatedExams = await examService.getAll();
    setExams(updatedExams);
  };

  const handleDeleteExam = async (id) => {
    await examService.delete(id);
    const updatedExams = await examService.getAll();
    setExams(updatedExams);
  };

  const handleSaveSession = async (session) => {
    await sessionService.add(session);
    const updatedSessions = await sessionService.getAll();
    setSessions(updatedSessions);
  };

  const handleDeleteSession = async (id) => {
    await sessionService.delete(id);
    const updatedSessions = await sessionService.getAll();
    setSessions(updatedSessions);
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="App">
      <div className="app-sidebar">
        <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        <Nav currentPage={currentPage} onNavigate={setCurrentPage} />
        <Footer />
      </div>
      <div className="app-content">
        {currentPage === 'home' && (
          <Main 
            sessions={sessions} 
            exams={exams} 
            onNavigate={setCurrentPage} 
          />
        )}
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
        {currentPage === 'analytics' && (
          <Analytics 
            sessions={sessions}
            exams={exams}
          />
        )}
        {currentPage === 'about' && <About />}
      </div>
    </div>
  );
}

export default App;