import { db } from "./firebase";
import { FirebaseError } from "firebase/app";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const getUniqname = (user) => user.email.split("@")[0];

/** Normalize to an array of strings */
const normalizeTrainings = (t) =>
  Array.isArray(t) ? t : [t].filter(Boolean);

/** --------- Reads --------- */
export const getUserData = async (uniqname) => {
  const ref = doc(db, "users", uniqname);
  const snap = await getDoc(ref);
  if (!snap.exists()) return undefined;
  const data = snap.data();
  return { ...data, trainings: normalizeTrainings(data.trainings || []) };
};

export const getAllUsers = async () => {
  try {
    const snap = await getDocs(collection(db, "users"));
    const users = [];
    snap.forEach((d) => {
      const data = d.data();
      users.push({
        ...data,
        trainings: normalizeTrainings(data.trainings || []),
      });
    });
    return users;
  } catch (error) {
    if (error instanceof FirebaseError) return [];
    throw error;
  }
};

/** --------- Creates --------- */
export const createUserWithAuth = async (user) => {
  const uniqname = getUniqname(user);
  const ref = doc(db, "users", uniqname);
  const newUser = { uniqname, role: "user", trainings: [] };
  await setDoc(ref, newUser);
  return newUser;
};

export const createUserNoAuth = async (uniqname, role, trainings) => {
  const ref = doc(db, "users", uniqname);
  const newUser = {
    uniqname,
    role,
    trainings: normalizeTrainings(trainings),
  };
  await setDoc(ref, newUser);
  return newUser;
};

/** --------- Updates / Deletes --------- */
export const updateUser = async (uniqname, updates) => {
  const ref = doc(db, "users", uniqname);

  // If trainings provided, normalize to array
  if (Object.prototype.hasOwnProperty.call(updates, "trainings")) {
    updates.trainings = normalizeTrainings(updates.trainings);
  }

  await updateDoc(ref, updates);
};

export const deleteUser = async (uniqname) => {
  const ref = doc(db, "users", uniqname);
  await deleteDoc(ref);
};

/** Optional helpers if you want one-off changes */
export const addTraining = async (uniqname, training) => {
  const current = await getUserData(uniqname);
  const set = new Set(current?.trainings || []);
  set.add(training);
  await updateUser(uniqname, { trainings: Array.from(set) });
};

export const removeTraining = async (uniqname, training) => {
  const current = await getUserData(uniqname);
  const filtered = (current?.trainings || []).filter((t) => t !== training);
  await updateUser(uniqname, { trainings: filtered });
};
