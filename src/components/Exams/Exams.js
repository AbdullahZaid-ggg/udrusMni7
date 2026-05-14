import { useState } from 'react';
import '../../styles/exams.css';

export default function Exams({ exams = [], onSaveExam, onDeleteExam }) {
  const [showForm, setShowForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [expandedExam, setExpandedExam] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    icon: '📚',
    subjects: [{ name: '', topics: '' }]
  });

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
      onSaveExam({ ...formData, id: editingExam.id, subjects: processedSubjects });
      setEditingExam(null);
    } else {
      onSaveExam({ ...formData, id: Date.now(), subjects: processedSubjects });
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
    onDeleteExam(deleteConfirm);
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
        {exams.map((exam) => (
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