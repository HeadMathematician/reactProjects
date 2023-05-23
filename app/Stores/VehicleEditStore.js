import { makeObservable, observable, action } from 'mobx';

import { getMakeById, getMakeDocId } from '../Services/VehicleMakeService';
import { getModelById, getModelDocId } from '../Services/VehicleModelService';
import { getMergedDocID } from '../Services/VehicleMergedService';

class VehicleEditStoreImpl {
  makeName = "";
  makeAbrv = "";
  modelName= "";
  modelAbrv = "";
  makeDocRef = "";
  modelDocRef = "";
  mergedDocRef = "";

  constructor() {
    makeObservable(this, {
      makeName: observable,
      modelName: observable,
      makeAbrv: observable,
      modelAbrv:observable,
      makeDocRef:observable,
      modelDocRef:observable,
      mergedDocRef:observable,
      setMergedDocRef:action.bound,
      setMakeDocRef: action.bound,
      setModelDocRef:action.bound,
      setMakeAbrv: action.bound,
      setModelAbrv:action.bound,
      setMakeName: action.bound,
      setModelName:action.bound,
    });
  }

  setMergedDocRef(value){
    this.mergedDocRef = value;
  }

  setMakeName(value){
    this.makeName = value;
  }

  setMakeAbrv(value){
    this.makeAbrv = value;
  }

  setModelName(value){
    this.modelName = value;
  }

  setModelAbrv(value){
    this.modelAbrv = value;
  }

  setModelDocRef(value){
    this.modelDocRef = value;
  }

  setMakeDocRef(value){
    this.makeDocRef = value;
  }

  fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const MAKE_ID = urlParams.get("makeid");

      const makeDocId = await getMakeDocId("MakeID", MAKE_ID);
      const fullMakeDoc = await getMakeById(makeDocId);

      const modelDocId = await getModelDocId("MakeID", MAKE_ID);
      const fullModelDoc = await getModelById(modelDocId);

      const mergedDocId = await getMergedDocID("MakeID", MAKE_ID);

      this.setMakeDocRef(makeDocId);
      this.setModelDocRef(modelDocId);
      this.setMergedDocRef(mergedDocId);
      this.setMakeName(fullMakeDoc.MakeName);
      this.setMakeAbrv(fullMakeDoc.MakeAbrv);
      this.setModelName(fullModelDoc.ModelName);
      this.setModelAbrv(fullModelDoc.ModelAbrv);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

}

const VehicleEditStore = new VehicleEditStoreImpl();
export default VehicleEditStore;
