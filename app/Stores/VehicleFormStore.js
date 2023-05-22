import { makeObservable, observable, action } from 'mobx';

class VehicleFormStoreImpl {
  name = '';
  abrv = '';
  makeName = "";
  makeAbrv = "";
  modelName= "";
  modelAbrv = "";

  constructor() {
    makeObservable(this, {
      name: observable,
      abrv: observable,
      makeName: observable,
      modelName: observable,
      makeAbrv: observable,
      modelAbrv:observable,
      setMakeAbrv: action.bound,
      setModelAbrv:action.bound,
      setMakeName: action.bound,
      setModelName:action.bound,
      setName: action.bound,
      setAbrv: action.bound,
      resetForm: action.bound,
    });
  }

  setName(value) {
    this.name = value;
  }

  setAbrv(value) {
    this.abrv = value;
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

  resetForm() {
    this.name = '';
    this.abrv = '';
  }
}

const VehicleFormStore = new VehicleFormStoreImpl();
export default VehicleFormStore;
