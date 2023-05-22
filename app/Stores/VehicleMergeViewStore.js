import { makeObservable, observable, action } from 'mobx';
import { toJS } from 'mobx';


class VehicleMergeViewStoreImpl {

    dir = "desc";
    currentPage = 1;
    mergedData = [];
    paginatedData = [];
    search = "";
    
    constructor(){
        makeObservable(this, {
            mergedData: observable,
            dir: observable,
            search: observable,
            currentPage: observable,
            paginatedData: observable,
            setDir: action.bound,
            setSearch: action.bound,
            setCurrentPage: action.bound,
            setPaginatedData: action.bound,
            setMergedData: action.bound,
        })
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

}

const VehicleMergeViewStore = new VehicleMergeViewStoreImpl();
export default VehicleMergeViewStore;