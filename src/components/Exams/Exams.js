import { useState } from 'react';
import '../../styles/exams.css';

const defaultExams = [
  {
    id: 1,
    name: 'الصف الأول المتوسط',
    icon: '📚',
    subjects: [
      { name: 'الرياضيات', topics: ['العمليات الحسابية', 'الكسور', 'النسبة المئوية', 'المعادلات البسيطة', 'الهندسة'] },
      { name: 'العلوم', topics: ['المادة والقياس', 'الحركة والقوة', 'الطاقة', 'الضوء والصوت', 'الحياة'] },
      { name: 'اللغة العربية', topics: ['النحو والصرف', 'القراءة', 'التعبير', 'الإملاء', 'الأدب'] },
      { name: 'الاجتماعيات', topics: ['الجغرافيا', 'التاريخ', 'الوطنية', 'الاقتصاد'] },
      { name: 'التربية الفنية', topics: ['الرسم', 'الألوان', 'التشكيل'] },
    ]
  },
  {
    id: 2,
    name: 'الصف الثاني المتوسط',
    icon: '📖',
    subjects: [
      { name: 'الرياضيات', topics: ['الجبر', 'المتباينات', 'الدوال', 'الإحصاء', 'المساحة'] },
      { name: 'العلوم', topics: ['الخلية', 'الوراثة', 'البيئة', 'الكيمياء', 'الفيزياء'] },
      { name: 'اللغة العربية', topics: ['النصوص', 'القواعد', 'الإنشاء', 'الشعر', 'النثر'] },
      { name: 'الاجتماعيات', topics: ['تاريخ العالم', 'الجغرافيا', 'الحضارات', 'الأنظمة'] },
      { name: 'التربية الفنية', topics: ['الرسم الهندسي', 'التصميم', 'التطبيقات'] },
    ]
  },
  {
    id: 3,
    name: 'الصف الثالث المتوسط',
    icon: '🎯',
    subjects: [
      { name: 'الرياضيات', topics: ['المعادلات الخطية', 'التناسب', 'الإحصاء', 'الهندسة التحليلية', 'المجموعات'] },
      { name: 'العلوم', topics: ['الطباعة', 'التكاثر', 'الوراثة', 'البيئة', 'الكهرومغناطيسية'] },
      { name: 'اللغة العربية', topics: ['البلاغة', 'النقد', 'القواعد المتقدمة', 'الإماء', 'القراءة النقدية'] },
      { name: 'الاجتماعيات', topics: ['تاريخ الوطن', 'الجغرافيا', 'التربية الوطنية', 'الاقتصاد'] },
      { name: 'التربية الفنية', topics: ['التصميم الرقمي', 'التطبيقات العملية', 'المشاريع'] },
    ]
  },
  {
    id: 4,
    name: 'الصف الأول الثانوي',
    icon: '🚀',
    subjects: [
      { name: 'الرياضيات', topics: ['المجموعات', 'الrelations/functions', 'المتتاليات', 'الحدوديات', 'المصفوفات'] },
      { name: 'الفيزياء', topics: ['الحركة', 'القوى', 'الطاقة', 'الشد والضغط', 'المد والجزر'] },
      { name: 'الكيمياء', topics: ['المادة', 'الذرة', 'الجدول الدوري', 'الروابط', 'التحليل'] },
      { name: 'الأحياء', topics: ['الخلية', 'الأنسجة', 'التنفس', 'التغذية', 'التكاثر'] },
      { name: 'اللغة العربية', topics: ['النصوص', 'القواعد', 'الأدب', 'البلاغة', 'التعبير'] },
    ]
  },
  {
    id: 5,
    name: 'الصف الثاني الثانوي - العلمي',
    icon: '🔬',
    subjects: [
      { name: 'الرياضيات', topics: ['التكامل', 'التفاضل', 'المعادلات التفاضلية', 'المثلثات', 'الإحصاء'] },
      { name: 'الفيزياء', topics: ['الكهرومغناطيسية', 'البصريات', 'الصوت', 'الحرارة', 'ميكانيكا الكم'] },
      { name: 'الكيمياء', topics: ['الحموض والقواعد', 'التأكسد والاختزال', 'الكيمياء العضوية', 'التحليل الكمي'] },
      { name: 'الأحياء', topics: ['الوراثة', 'التطور', 'البيئة', 'التقنية الحيوية', 'علم الخلايا'] },
      { name: 'اللغة العربية', topics: ['النصوص الأدبية', 'القواعد', 'البلاغة', 'النقد', 'الإماء'] },
    ]
  },
  {
    id: 6,
    name: 'الصف الثالث الثانوي - العلمي',
    icon: '🎓',
    subjects: [
      { name: 'الرياضيات', topics: ['المصفوفات', 'المحددات', 'الهندسة الفضائية', 'المعادلات комплекс', 'الإحصاء المتقدم'] },
      { name: 'الفيزياء', topics: ['النسبية', 'الفيزياء النووية', 'الجسيمات', 'الميكانيكا الإحصائية', 'الكهرومغناطيسية المتقدمة'] },
      { name: 'الكيمياء', topics: ['الكيمياء الحيوية', 'الكيمياء الصناعية', 'التحليل الطيفي', 'الكيمياء التطبيقية'] },
      { name: 'الأحياء', topics: ['التقنية الحيوية', 'الهندسة الوراثية', 'الطب', 'البيئة المتقدمة'] },
      { name: 'اللغة العربية', topics: ['الأدب', 'النقد', 'البلاغة', 'الإماء', 'البحث العلمي'] },
    ]
  },
];

export default function Exams({ exams, onSaveExam, onDeleteExam }) {
  const [examsList, setExamsList] = useState(exams || defaultExams);
  const [showForm, setShowForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [expandedExam, setExpandedExam] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    icon: '📚',
    subjects: [{ name: '', topics: '' }]
  });

  const displayExams = exams || examsList;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index][field] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', topics: '' }]
    });
  };

  const removeSubject = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedSubjects = formData.subjects.map(sub => ({
      name: sub.name,
      topics: sub.topics.split(',').map(t => t.trim()).filter(t => t)
    }));

    if (editingExam) {
      setExamsList(examsList.map(exam => 
        exam.id === editingExam.id 
          ? { ...formData, id: editingExam.id, subjects: processedSubjects }
          : exam
      ));
      setEditingExam(null);
    } else {
      setExamsList([...examsList, { ...formData, id: Date.now(), subjects: processedSubjects }]);
    }
    
    setFormData({ name: '', icon: '📚', subjects: [{ name: '', topics: '' }] });
    setShowForm(false);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      icon: exam.icon,
      subjects: exam.subjects.map(sub => ({ name: sub.name, topics: sub.topics.join(', ') }))
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    setExamsList(examsList.filter(exam => exam.id !== deleteConfirm));
    setDeleteConfirm(null);
  };

  const toggleExpand = (id) => {
    setExpandedExam(expandedExam === id ? null : id);
  };

  const openAddForm = () => {
    setEditingExam(null);
    setFormData({ name: '', icon: '📚', subjects: [{ name: '', topics: '' }] });
    setShowForm(true);
  };

  return (
    <div className="exams">
      <div className="exams-header-row">
        <h2>الاختبارات والمواد</h2>
        <button className="add-btn" onClick={openAddForm}>+ إضافة اختبار</button>
      </div>
      
      {showForm && (
        <form className="exam-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>اسم الاختبار</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="مثال: الصف الأول المتوسط"
                required
              />
            </div>
            <div className="form-group">
              <label>الأيقونة</label>
              <select name="icon" value={formData.icon} onChange={handleInputChange}>
                <option value="📚">📚</option>
                <option value="📖">📖</option>
                <option value="🎯">🎯</option>
                <option value="🚀">🚀</option>
                <option value="🔬">🔬</option>
                <option value="🎓">🎓</option>
                <option value="📝">📝</option>
                <option value="💡">💡</option>
              </select>
            </div>
          </div>
          
          <div className="subjects-form">
            <label>المواد</label>
            {formData.subjects.map((subject, index) => (
              <div key={index} className="subject-row">
                <input
                  type="text"
                  placeholder="اسم المادة"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="المواضيع (افصل بفواصل)"
                  value={subject.topics}
                  onChange={(e) => handleSubjectChange(index, 'topics', e.target.value)}
                />
                {formData.subjects.length > 1 && (
                  <button type="button" className="remove-subject" onClick={() => removeSubject(index)}>×</button>
                )}
              </div>
            ))}
            <button type="button" className="add-subject-btn" onClick={addSubject}>+ إضافة مادة</button>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn">{editingExam ? 'تحديث' : 'حفظ'}</button>
            <button type="button" className="cancel-btn" onClick={() => { setShowForm(false); setEditingExam(null); }}>إلغاء</button>
          </div>
        </form>
      )}

      {deleteConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <p>هل أنت متأكد من حذف هذا الاختبار؟</p>
            <div className="confirm-actions">
              <button className="confirm-delete" onClick={confirmDelete}>حذف</button>
              <button className="confirm-cancel" onClick={() => setDeleteConfirm(null)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="exams-grid">
        {displayExams.map((exam) => (
          <div key={exam.id} className="exam-card">
            <div className="exam-header" onClick={() => toggleExpand(exam.id)}>
              <span className="exam-icon">{exam.icon}</span>
              <h3>{exam.name}</h3>
              <div className="exam-actions">
                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(exam); }}>✏️</button>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(exam.id); }}>🗑️</button>
              </div>
            </div>
            {expandedExam === exam.id && (
              <div className="exam-subjects">
                {exam.subjects.map((subject, index) => (
                  <div key={index} className="subject-section">
                    <h4 className="subject-name">{subject.name}</h4>
                    <ul className="subject-topics">
                      {subject.topics.map((topic, idx) => (
                        <li key={idx}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}