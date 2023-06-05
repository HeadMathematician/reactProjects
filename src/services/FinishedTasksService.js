import {  getDocs, collection, addDoc, deleteDoc, doc} from "firebase/firestore";
import { db } from "./firebaseConfig";

const table = "FinishedTasks";

const getFinishedTasks = async () => {
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

const createFinishedTask = async (data) => {
    try{
        const collectionRef = collection(db, table);
        await addDoc(collectionRef, data);

    }catch(error){
        console.error(error);
    }
}

const deleteFinishedTask = async (id) => {
    try{
        const documentRef = doc(db, table, id);
        await deleteDoc(documentRef);
    }catch(error){
        console.error(error);
    }
}

export {
    getFinishedTasks,
    createFinishedTask,
    deleteFinishedTask,
}