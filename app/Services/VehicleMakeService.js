import {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentIdByFieldValue
  } from "./MainService";
  
  const table = "VehicleMake";

  const createMake = async (data) => {
    await createDocument(table, data);
  };
  
  const getMake = async () => {
    return await getAllDocuments(table);
  };
  
  const getMakeById = async (id) => {
    return await getDocumentById(table, id);
  };
  
  const updateMake = async (id, updatedData) => {
    await updateDocument(table, id, updatedData);
    
  };
  
  const deleteMake = async (id) => {
    await deleteDocument(table, id);
  };

  const getMakeDocId = async(name, value) => {
    return await getDocumentIdByFieldValue(table, name, value)
  }
  
  export {
    createMake,
    getMake,
    getMakeById,
    updateMake,
    deleteMake,
    getMakeDocId
  };
  