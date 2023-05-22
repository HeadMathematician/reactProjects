import { makeObservable, observable, action } from 'mobx';

class VehicleFormHandlerStoreImpl {
    
    isAdding = false;

  constructor() {
    
    makeObservable(this, {
      isAdding: observable,
      setIsAdding: action.bound,
    });
  }

  setIsAdding(){
    this.isAdding = !this.isAdding;
  }

}

const VehicleFormHandlerStore = new VehicleFormHandlerStoreImpl();
export default VehicleFormHandlerStore;
