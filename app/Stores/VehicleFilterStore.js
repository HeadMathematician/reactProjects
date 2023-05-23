import { makeObservable, observable, action } from 'mobx';


class VehicleFilterStoreImpl {

    filteredData = [];
    currentPage = 1;
    search = "";
    number = 1;
    
    constructor(){
        makeObservable(this, {
            filteredData: observable,
            currentPage: observable,
            search: observable,
            number: observable,
            
            setFilteredData: action.bound,
            setCurrentPage: action.bound,
            setSearch: action.bound,
            setNumber: action.bound
        })
    }

    setFilteredData(data){
        this.filteredData = data;
    }

    setCurrentPage(page){
        this.currentPage = page;
    }

    setSearch(value){
        this.search = value;
    }

    setNumber(value){
        this.number = value;
    }

}


const VehicleFilterStore = new VehicleFilterStoreImpl();

export default VehicleFilterStore;