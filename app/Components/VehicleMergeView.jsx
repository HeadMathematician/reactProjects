"use client";

import { useEffect, useMemo} from "react";
import Link from "next/link";
import {
	deleteRow,
	getPaginationButtons,
	getNumberOfRows,
	updateNumberOfRows,
} from "../Services/DataProcessingService";
import VehicleTable from "./VehicleTable";

import { observer } from "mobx-react";
import styles from "./VehicleTable.module.css";
import VehicleMergeViewStore from "../Stores/VehicleMergeViewStore";

const MergedTable = () => {
	const { currentPage, mergedData, 
			setCurrentPage, setMergedData,
			search, setSearch, number, setNumber, 
			flag, setFlag, fetchData } = VehicleMergeViewStore

			
	const memoizedCurrentPage = useMemo(() => currentPage, [currentPage]);
	
	useEffect(() => {

		fetchData();}, 
		[memoizedCurrentPage, mergedData.length, ]
	);


	const deleteRowHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this row?")) {
			const newNumberOfRows = number -1;
			await deleteRow(id);
			await updateNumberOfRows(newNumberOfRows);
			const newData = mergedData.filter((row) => row.MakeID !== id);
			
			setMergedData(newData);
		}
	};

	const handlePageChange = (currentPage) => {
		setCurrentPage(currentPage);
	};

	const sortToggle = async () => {
		setFlag(!flag);
		if(!flag){
			const response = await fetch(`http://localhost:8080/paginateData?pageSize=${10}&page=${currentPage}&sortBy=asc`);
			const data = await response.json();
			setMergedData(data);
		}
		else{
			const response = await fetch(`http://localhost:8080/paginateData?pageSize=${10}&page=${currentPage}&sortBy=desc`);
			const data = await response.json();
			setMergedData(data);
		}
	};

	const pageButtons = getPaginationButtons(number, handlePageChange);

	const searchHandler = (event) => {
		setSearch(event.target.value);
	}

	const navigateToFilterPage = () => {
		const searchValue = search.trim();
		window.location.href = `/vehicles/filter?search=${searchValue}&page=1`;
	}

	const searchNavigate = (event) =>{
		if(event.key === "Enter"){
		event.preventDefault();

			navigateToFilterPage();
		}
	}

	return (
		<div>
			<div className={styles.actionContainer}>
				<button className={styles.sortButton} onClick={sortToggle}>
					Sort By Make Name
				</button>
				<label className={styles.label}>Search Make Name: </label>
				<input
					type="text"
					className={styles.input}
					placeholder="BMW, Audi, X5, R8"
					onChange={searchHandler}
					onKeyDown={searchNavigate}
				/>
				<Link className={styles.add} href="/vehicles/create">
					Add Vehicle
				</Link>
			</div>
			<VehicleTable mergedData={mergedData} onDelete={deleteRowHandler} />
			<div className={styles.paginationContainer}>{pageButtons}</div>
		</div>
	);
};

export default observer(MergedTable);