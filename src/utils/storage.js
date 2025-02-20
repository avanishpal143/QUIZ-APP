const DB_NAME = 'QuizDB';
const STORE_NAME = 'quiz_results';
const DB_VERSION = 1;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { 
          keyPath: 'id',
          autoIncrement: true 
        });
      }
    };
  });
};

export const saveQuizResult = async (result) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.add(result);
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
};

export const getQuizHistory = async () => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        ));
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting quiz history:', error);
    return [];
  }
};