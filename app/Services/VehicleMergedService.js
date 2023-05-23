import {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentIdByFieldValue
  } from "./MainService";
  
  const table = "VehicleMerged";

  const createMerged = async (data) => {
    await createDocument(table, data);
  };
  
  const getMerged = async () => {
    return await getAllDocuments(table);
  };
  
  const getMergedById = async (id) => {
    return await getDocumentById(table, id);
  };
  
  const updateMerged = async (id, updatedData) => {
    try{
        
        await updateDocument(table, id, updatedData); 
    }catch(error){
        console.error(error)
    }
    
  };
  
  const deleteMerged = async (id) => {
    await deleteDocument(table, id);
  };

  const getMergedDocID = async(name, value) => {
    try{
        const data = await getDocumentIdByFieldValue(table, name, value);
        return data;
    }catch(error){
        console.error(error);
    }
    
  }
  
  export {
    createMerged,
    getMerged,
    getMergedById,
    updateMerged,
    deleteMerged,
    getMergedDocID,
  };
  