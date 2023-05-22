import {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentIdByFieldValue
  } from "./MainService";
  
  const createModel = async (data) => {
    await createDocument("VehicleModel", data);
  };
  
  const getModel = async () => {
    return await getAllDocuments("VehicleModel");
  };
  
  const getModelById = async (id) => {
    return await getDocumentById("VehicleModel", id);
  };
  
  const updateModel = async (id, updatedData) => {
    await updateDocument("VehicleModel", id, updatedData);
  };
  
  const deleteModel = async (id) => {
    await deleteDocument("VehicleModel", id);
  };

  const getModelDocId = async(name, value) => {
    return await getDocumentIdByFieldValue("VehicleModel", name, value)
  }
  
  export {
    createModel,
    getModel,
    getModelById,
    updateModel,
    deleteModel,
    getModelDocId
  };
  