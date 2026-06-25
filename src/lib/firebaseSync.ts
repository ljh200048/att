import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  getDoc 
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetches all documents from a Firestore collection
 */
export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items: T[] = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ ...docSnap.data() } as T);
    });
    return items;
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    return [];
  }
}

/**
 * Saves a single document to Firestore (creates or updates)
 */
export async function saveDocToDb<T>(collectionName: string, id: string, data: any): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data);
  } catch (error) {
    console.error(`Error saving doc ${id} to ${collectionName}:`, error);
  }
}

/**
 * Deletes a single document from Firestore
 */
export async function deleteDocFromDb(collectionName: string, id: string): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting doc ${id} from ${collectionName}:`, error);
  }
}

/**
 * Seeds a collection with default items if it is currently empty
 */
export async function seedCollectionIfEmpty<T>(
  collectionName: string, 
  defaultItems: T[], 
  idField: keyof T
): Promise<T[]> {
  try {
    const existing = await fetchCollection<T>(collectionName);
    if (existing.length > 0) {
      return existing;
    }

    console.log(`Seeding collection ${collectionName} with ${defaultItems.length} items...`);
    for (const item of defaultItems) {
      const id = String(item[idField]);
      await saveDocToDb(collectionName, id, item);
    }
    return defaultItems;
  } catch (error) {
    console.error(`Error seeding collection ${collectionName}:`, error);
    return defaultItems;
  }
}

/**
 * Fetches visual settings/backgrounds
 */
export async function fetchSettingsDoc(settingsId: string): Promise<any> {
  try {
    const docRef = doc(db, 'settings', settingsId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error(`Error fetching settings ${settingsId}:`, error);
    return null;
  }
}

/**
 * Saves visual settings/backgrounds
 */
export async function saveSettingsDoc(settingsId: string, data: any): Promise<void> {
  try {
    const docRef = doc(db, 'settings', settingsId);
    await setDoc(docRef, data);
  } catch (error) {
    console.error(`Error saving settings ${settingsId}:`, error);
  }
}
