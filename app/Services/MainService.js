import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"

const createDocument = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
    console.log("Document created successfully");
  } catch (error) {
    console.error("Error creating document: ", error);
    throw error;
  }
};

const getAllDocuments = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
   
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

const getDocumentIdByFieldValue = async (collectionName, fieldName, fieldValue) => {
  const q = query(collection(db, collectionName), where(fieldName, "==", fieldValue));
  const querySnapshot = await getDocs(q); 

  if (querySnapshot.empty) {
    return null;
  }
  
  const document = querySnapshot.docs[0];
  return document.id
};

const getDocumentById = async (collectionName, documentId) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      const documentData = documentSnapshot.data();
      return { id: documentSnapshot.id, ...documentData };
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

const updateDocument = async (collectionName, documentId, updatedData) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    await updateDoc(documentRef, updatedData);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

const deleteDocument = async (collectionName, documentId) => {
  try {
    
    const documentRef = doc(db, collectionName, documentId);
    await deleteDoc(documentRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

export {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getDocumentIdByFieldValue
};
