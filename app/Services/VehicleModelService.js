import {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentIdByFieldValue
  } from "./MainService";

  const table = "VehicleModel";
  
  const createModel = async (data) => {
    await createDocument(table, data);
  };
  
  const getModel = async () => {
    return await getAllDocuments(table);
  };
  
  const getModelById = async (id) => {
    return await getDocumentById(table, id);
  };
  
  const updateModel = async (id, updatedData) => {
    await updateDocument(table, id, updatedData);
    
  };
  
  const deleteModel = async (id) => {
    await deleteDocument(table, id);
  };

  const getModelDocId = async(name, value) => {
    return await getDocumentIdByFieldValue(table, name, value)
  }
  
  export {
    createModel,
    getModel,
    getModelById,
    updateModel,
    deleteModel,
    getModelDocId
  };
  