"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
	deleteRow,
	getMergedData,
	getPaginationButtons,
	getSortedTable,
	getPaginatedTable
} from "../Services/DataProcessingService";
import VehicleTable from "./VehicleTable";

import { observer } from "mobx-react";
import styles from "./VehicleTable.module.css";
import VehicleMergeViewStore from "../Stores/VehicleMergeViewStore";

const MergedTable = () => {
	const { dir, currentPage, mergedData, paginatedData, setDir, 
			setCurrentPage, setMergedData, setPaginatedData, search, setSearch } = VehicleMergeViewStore
	const memoizedCurrentPage = useMemo(() => currentPage, [currentPage]);
	const memoizedDir = useMemo(() => dir, [dir]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getMergedData();
				const sortedTable = await getSortedTable(dir, data);
				const data2 = await getPaginatedTable(currentPage, 10, sortedTable);

				setMergedData(data);
				setPaginatedData(data2);
				
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, [memoizedCurrentPage, memoizedDir, paginatedData.length]);

	const deleteRowHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this row?")) {
			await deleteRow(id);
			const newData = paginatedData.filter((row) => row.MakeID !== id);
			
			setPaginatedData(newData);
		}
	};

	const handlePageChange = (currentPage) => {
		setCurrentPage(currentPage);
	};

	const sortToggle = async () => {
		setDir(dir === "asc" ? "desc" : "asc");
		const mergedTable = await getMergedData()
	
		const sortedTable = await getSortedTable(dir, mergedTable);
		
		const paginatedTable = await getPaginatedTable(currentPage, 10, sortedTable)
	
		setPaginatedData(paginatedTable);
	};

	const pageButtons = getPaginationButtons(mergedData, handlePageChange);

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
				<label className={styles.label}>Search: </label>
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
			<VehicleTable mergedData={paginatedData} onDelete={deleteRowHandler} paginatedData={paginatedData} />
			<div className={styles.paginationContainer}>{pageButtons}</div>
		</div>
	);
};

export default observer(MergedTable);