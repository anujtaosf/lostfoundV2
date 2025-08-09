import { FirebaseError } from "firebase/app";
import { db } from "./firebase";
import { addDoc,collection,deleteDoc,doc,getDocs,query,updateDoc, where, deleteField} from "firebase/firestore";

/**
 * @typedef tool
 * @property {String} name name of tool
 * @property {Number} amount amount in tool shop
 * @property {Number} rating tool rating
 * @property {String} training required training to checkout tool
 *
 */

/**
 * @returns {Tool[]} list of all tools in databasde
 */
export const getAllTools = async () => {
  try {
    const snap = await getDocs(collection(db, "tools"));
    const tools = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return tools;
  } catch (error) {
    if (error instanceof FirebaseError) return [];
    throw error;
  }
};
/**
 * @param {String} name 
 * @returns {Tool} gets tool information by name
 */
export const getTool = async (name) => {
  try {
    const q = query(collection(db, "tools"), where("name", "==", name));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  } catch (error) {
    if (error instanceof FirebaseError) return null;
    throw error;
  }
};

export const createTool = async (tool) => {
  const ref = await addDoc(collection(db, "tools"), tool);
  return { id: ref.id, ...tool };
};

export const updateTool = async (id, updates) => {
  try {
    const ref = doc(db, "tools", id);
    await updateDoc(ref, updates);
  } catch (error) {
    if (error instanceof FirebaseError) return;
    throw error;
  }
};

export const updateToolByName = async (name, updates) => {
  const t = await getTool(name);
  if (!t) return;
  await updateTool(t.id, updates);
};

export const deleteTool = async (id) => {
  try {
    const ref = doc(db, "tools", id);
    await deleteDoc(ref);
  } catch (error) {
    if (error instanceof FirebaseError) return;
    throw error;
  }
};

export const deleteToolByName = async (name) => {
  const t = await getTool(name);
  if (!t) return;
  await deleteTool(t.id);
};

export const setManualLeft = async (id, left) => {
  const ref = doc(db, "tools", id);
  await updateDoc(ref, { manualLeft: Number(left) });
};

export const clearManualLeft = async (id) => {
  const ref = doc(db, "tools", id);
  await updateDoc(ref, { manualLeft: deleteField() });
};