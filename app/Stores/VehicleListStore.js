import { action, makeObservable, observable } from "mobx";

class VehicleListStoreImpl {
	vehicles = [];
	currentPage = 1;

	constructor() {
		makeObservable(this, {
			vehicles: observable,
			setVehicles: action.bound,
			currentPage: observable,
			setCurrentPage: action.bound,
		});
	}

	setVehicles(vehicles) {
		this.vehicles = vehicles;
	}

	setCurrentPage(page){
		this.currentPage = page;
	}
}

const VehicleListStore = new VehicleListStoreImpl();
export default VehicleListStore;
