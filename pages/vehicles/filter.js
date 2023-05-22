import React, { useEffect } from "react";

import { observer } from "mobx-react";

import VehicleTable from "@/app/Components/VehicleTable";
import { getMergedData, getFilteredTable, deleteRow,
     getPagButtonsFilter, getPaginatedTable } from "@/app/Services/DataProcessingService";

import VehicleFilterStore from "@/app/Stores/VehicleFilterStore";
    
import Link from "next/link";
import styles from "../../app/Components/VehicleTable.module.css"

const Filter = () => {
    
    const { currentPage, paginatedTable, filteredData, search, setCurrentPage, setPaginatedTable, setFilteredData, setSearch } = VehicleFilterStore

    useEffect(() =>{
        const fetch = async () => {
            try{
                const urlParams = new URLSearchParams(window.location.search);
                const search = urlParams.get("search");
                const filteredData = await getFilteredTable(search);
                setFilteredData(filteredData);

                const paginatedTable = await getPaginatedTable(currentPage, 10, filteredData);
                console.log(paginatedTable);
                console.log(paginatedTable);
                setPaginatedTable(paginatedTable);
                setSearch(search);
                
            }catch(error){
                console.error(error)
            }
           
        };
        fetch();
    }, [currentPage, paginatedTable.length]);

    const handlePageChange = (currentPage) => {
		setCurrentPage(currentPage);
	};

    const pageButtons = getPagButtonsFilter(filteredData, handlePageChange, search)

    const deleteRowHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this row?")) {
			await deleteRow(id);
			const newData = paginatedTable.filter((row) => row.MakeID !== id);
			
			setPaginatedTable(newData);
		}
	};

    
    return (
        <div>
            <Link className={styles.sortButton} href="/vehicles/pages?page=1">Go Back</Link>
            <VehicleTable paginatedData={paginatedTable} onDelete={deleteRowHandler}/>
            <div className={styles.paginationContainer}>
                {pageButtons} 
            </div>
        </div>
    )
}

export default observer(Filter);