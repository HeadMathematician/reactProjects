import { makeObservable, observable, action } from 'mobx';
import { getFilteredTable } from '../Services/DataProcessingService';

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
            fetchData: observable,
            
            setFilteredData: action.bound,
            setCurrentPage: action.bound,
            setSearch: action.bound,
            setNumber: action.bound,
           
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


    fetchData = async (currentPage) => {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const search = urlParams.get("search");
    
          const response = await fetch(`http://localhost:8080/filterData?pageSize=10&page=${currentPage}&searchValue=${search}`);
          const data = await response.json();
    
          const number = await getFilteredTable(currentPage, search);
          this.setNumber(number);
    
          this.setFilteredData(data);
          this.setSearch(search);
        } catch (error) {
          console.error(error);
        }
      };

}


const VehicleFilterStore = new VehicleFilterStoreImpl();

export default VehicleFilterStore;