import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  getDoc 
} from 'firebase/firestore';
import { db, auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

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
  } catch (error: any) {
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      handleFirestoreError(error, OperationType.LIST, collectionName);
    }
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
  } catch (error: any) {
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${id}`);
    }
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
  } catch (error: any) {
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
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
  } catch (error: any) {
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
  } catch (error: any) {
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      handleFirestoreError(error, OperationType.GET, `settings/${settingsId}`);
    }
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
  } catch (error: any) {
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      handleFirestoreError(error, OperationType.WRITE, `settings/${settingsId}`);
    }
    console.error(`Error saving settings ${settingsId}:`, error);
  }
}
