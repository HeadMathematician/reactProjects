import { makeObservable, observable, action } from 'mobx';

class VehicleEditStoreImpl {
  makeName = "";
  makeAbrv = "";
  modelName= "";
  modelAbrv = "";
  makeDocRef = "";
  modelDocRef = "";


  constructor() {
    makeObservable(this, {
      makeName: observable,
      modelName: observable,
      makeAbrv: observable,
      modelAbrv:observable,
      makeDocRef:observable,
      modelDocRef:observable,
      setMakeDocRef: action.bound,
      setModelDocRef:action.bound,
      setMakeAbrv: action.bound,
      setModelAbrv:action.bound,
      setMakeName: action.bound,
      setModelName:action.bound,
    });
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
}

const VehicleEditStore = new VehicleEditStoreImpl();
export default VehicleEditStore;
