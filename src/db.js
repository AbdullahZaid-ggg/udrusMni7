import Dexie from 'dexie';

export const db = new Dexie('StudyAppDB');

db.version(1).stores({
  exams: '++id, name, date, subject',
  sessions: '++id, examId, examName, duration, type, date'
});

export const examService = {
  async getAll() {
    return await db.exams.toArray();
  },
  async add(exam) {
    return await db.exams.add({ ...exam, id: Date.now() });
  },
  async update(exam) {
    return await db.exams.put(exam);
  },
  async delete(id) {
    return await db.exams.delete(id);
  }
};

export const sessionService = {
  async getAll() {
    return await db.sessions.toArray();
  },
  async add(session) {
    return await db.sessions.add({ ...session, id: Date.now() });
  },
  async delete(id) {
    return await db.sessions.delete(id);
  }
};

export async function migrateFromLocalStorage(defaultExams) {
  const count = await db.exams.count();
  if (count > 0) return;

  const storedExams = localStorage.getItem('studyapp_exams');
  const storedSessions = localStorage.getItem('studyapp_sessions');

  if (storedExams) {
    try {
      const parsed = JSON.parse(storedExams);
      if (Array.isArray(parsed) && parsed.length > 0) {
        await db.exams.bulkAdd(parsed);
        localStorage.removeItem('studyapp_exams');
      }
    } catch {}
  } else {
    await db.exams.bulkAdd(defaultExams);
  }

  if (storedSessions) {
    try {
      const parsed = JSON.parse(storedSessions);
      if (Array.isArray(parsed) && parsed.length > 0) {
        await db.sessions.bulkAdd(parsed);
        localStorage.removeItem('studyapp_sessions');
      }
    } catch {}
  }
}