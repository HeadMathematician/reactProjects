import { makeObservable, observable, action } from 'mobx';


class VehicleFilterStoreImpl {

    filteredData = [];
    currentPage = 1;
    search = "";
    paginatedTable = [];
    
    constructor(){
        makeObservable(this, {
            filteredData: observable,
            currentPage: observable,
            search: observable,
            paginatedTable: observable,
            setFilteredData: action.bound,
            setCurrentPage: action.bound,
            setSearch: action.bound,
            setPaginatedTable: action.bound
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

    setPaginatedTable(table){
        this.paginatedTable = table;
    }

}


const VehicleFilterStore = new VehicleFilterStoreImpl();

export default VehicleFilterStore;