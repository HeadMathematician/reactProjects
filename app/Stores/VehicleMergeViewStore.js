import { makeObservable, observable, action } from 'mobx';
import { toJS } from 'mobx';

import { getNumberOfRows } from '../Services/DataProcessingService';


class VehicleMergeViewStoreImpl {

    currentPage = 1;
    mergedData = [];
    search = "";
    number = 1;
    flag = true;

    constructor(){
        makeObservable(this, {
            mergedData: observable,
            number: observable,
            search: observable,
            currentPage: observable,
            flag: observable,

            fetchData: action.bound,
            setSearch: action.bound,
            setNumber: action.bound,
            setCurrentPage: action.bound,
            setMergedData: action.bound,
            setFlag: action.bound,
        })
    }

    setNumber(value){
        this.number = value;
    }

    setDir(value){
        this.dir = value;
    }
    setPaginatedData(data){
        this.paginatedData = data;
    }

    setCurrentPage(page){
        this.currentPage = page;
    }

    setMergedData(data){
        this.mergedData = data;
    }
    
    setSearch(value){
        this.search = value;
    }
    
    setFlag(value){
        this.flag = value;
    }

    fetchData = async () => {
        try {
          if (!this.flag) {
            const response = await fetch(
              `http://localhost:8080/paginateData?pageSize=${10}&page=${this.currentPage}&sortBy=desc`
            );
            const data = await response.json();
            this.setMergedData(data);
            this.setFlag(false);
          } else {
            const response = await fetch(
              `http://localhost:8080/paginateData?pageSize=${10}&page=${this.currentPage}&sortBy=asc`
            );
            const data = await response.json();
            this.setMergedData(data);
            this.setFlag(true);
          }
    
          const rowNumber = await getNumberOfRows();
          this.setNumber(rowNumber);
          
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

}

const VehicleMergeViewStore = new VehicleMergeViewStoreImpl();
export default VehicleMergeViewStore;