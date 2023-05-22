import {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentIdByFieldValue
  } from "./MainService";
  
  const createMake = async (data) => {
    await createDocument("VehicleMake", data);
  };
  
  const getMake = async () => {
    return await getAllDocuments("VehicleMake");
  };
  
  const getMakeById = async (id) => {
    return await getDocumentById("VehicleMake", id);
  };
  
  const updateMake = async (id, updatedData) => {
    await updateDocument("VehicleMake", id, updatedData);
  };
  
  const deleteMake = async (id) => {
    await deleteDocument("VehicleMake", id);
  };

  const getMakeDocId = async(name, value) => {
    return await getDocumentIdByFieldValue("VehicleMake", name, value)
  }
  
  export {
    createMake,
    getMake,
    getMakeById,
    updateMake,
    deleteMake,
    getMakeDocId
  };
  