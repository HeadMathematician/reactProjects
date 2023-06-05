import {  getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const table = "Tasks";

const getAllDocuments = async () => {
    try{
        const collectionRef = collection(db, table);
        const querySnapshot = await getDocs(collectionRef);
        const rows = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return rows;
    }catch(error){
        console.error(error);
    }
}

const createDocument = async (data) => {
    try{
        const collectionRef = collection(db, table);
        await addDoc(collectionRef, data);
    }catch (error){
        console.error(error);
    }
}

const deleteDocument = async (id) => {
    try{
        const documentRef = doc(db, table, id);
        await deleteDoc(documentRef);
    }catch(error){
        console.error(error);
    }
}

const editDocument = async (id, data) => {
    try{
        const documentRef = doc(db, table, id);
        await updateDoc(documentRef, data);
    }catch(error){
        console.error(error);
    }
}

export {
    getAllDocuments,
    createDocument,
    deleteDocument,
    editDocument,
}