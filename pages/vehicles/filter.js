import React, { useEffect } from "react";

import { observer } from "mobx-react";

import VehicleTable from "@/app/Components/VehicleTable";
import { getFilteredTable, deleteRow,
     getPagButtonsFilter } from "@/app/Services/DataProcessingService";

import VehicleFilterStore from "@/app/Stores/VehicleFilterStore";
    
import Link from "next/link";
import styles from "../../app/Components/VehicleTable.module.css"

const Filter = () => {
    
    const { currentPage, filteredData, search, number, 
            setCurrentPage, setFilteredData, fetchData } = VehicleFilterStore

    useEffect(() =>{
        fetchData();
    }, [currentPage ]);

    const handlePageChange = (currentPage) => {
		setCurrentPage(currentPage);
	};

    const pageButtons = getPagButtonsFilter(number, handlePageChange, search)

    const deleteRowHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this row?")) {
			await deleteRow(id);
			const newData = filteredData.filter((row) => row.MakeID !== id);
			
			setFilteredData(newData);
		}
	};

    return (
        <div>
            <Link className={styles.sortButton} href="/vehicles">Go Back</Link>
            <VehicleTable mergedData={filteredData} onDelete={deleteRowHandler}/>
            <div className={styles.paginationContainer}>
                {pageButtons} 
            </div>
        </div>
    )
}

export default observer(Filter);