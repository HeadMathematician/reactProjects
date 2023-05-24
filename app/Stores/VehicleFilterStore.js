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
            
            fetchData: action.bound,
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


    fetchData = async () => {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const search = urlParams.get("search");

          this.setSearch(search);
    
          const response = await fetch(`http://localhost:8080/filterData?pageSize=10&page=${this.currentPage}&searchValue=${search}`);
          const data = await response.json();
    
          const number = await getFilteredTable(this.currentPage, search);
          this.setNumber(number);
    
          this.setFilteredData(data);
        } catch (error) {
          console.error(error);
        }
      };
}


const VehicleFilterStore = new VehicleFilterStoreImpl();

export default VehicleFilterStore;