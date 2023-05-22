import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

import { deleteMake, getMakeDocId } from "../Services/VehicleMakeService";
import { deleteModel, getModelDocId } from "../Services/VehicleModelService";

import styles from "../Components/VehicleTable.module.css";

import Link from "next/link";

const getFilteredTable = async (value) => {
	try {
		if(value == ""){
			return await getMergedData();
		}
		else{
		const allData = await getMergedData();
		const filteredData = allData.filter((doc) => 
		doc.MakeName.toLowerCase().includes(value.toLowerCase()) ||
		doc.MakeAbrv.toLowerCase().includes(value.toLowerCase()) ||
		doc.ModelName.toLowerCase().includes(value.toLowerCase()) ||
		doc.ModelAbrv.toLowerCase().includes(value.toLowerCase())
		);
		return filteredData;
		}
		

		
	} catch (error) {
		console.error("Error filtering vehicles:", error);
		throw error;
	}
};

const getPaginatedTable = async (pageNo, pageSize, table) => {
	try {
		const data = table;
		const startIndex = (pageNo - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		return data.slice(startIndex, endIndex);
	} catch (error) {
		console.error("Error while pagingating vehicle table: ", error);
		throw error;
	}
};

const getMergedData = async () => {
	try {
		const q1 = query(collection(db, "VehicleModel"));
		const querySnapshot1 = await getDocs(q1);
		const data1 = [];
		querySnapshot1.forEach((doc) => {
			data1.push(doc.data());
		});

		const q2 = query(collection(db, "VehicleMake"));
		const querySnapshot2 = await getDocs(q2);
		const data2 = [];
		querySnapshot2.forEach((doc) => {
			data2.push(doc.data());
		});

		const mergedData = data2.map((make) => {
			const correspondingModel = data1.find(
				(model) => model.MakeID === make.MakeID
			);
			return { ...make, ...correspondingModel };
		});

		mergedData.sort((a, b) => a.MakeName.localeCompare(b.MakeName));

		return mergedData;
	} catch (error) {
		console.error("Error in getMergedData method: ", error);
		throw error;
	}
};

const getPaginationButtons = (
	vehicles,
	handlePageChange
  ) => {
	const totalPages = Math.ceil(vehicles.length / 10);
  
	const paginationLinks = [...Array(totalPages)].map((_, index) => {
	  const handleClick = () => handlePageChange(index + 1);
	  return (
		<Link
		  href={`/vehicles/pages?page=${index + 1}`}
		  className={styles.pageButtons}
		  key={index}
		  onClick={handleClick}
		>
		  {index + 1}
		</Link>
	  );
	});
  
	return paginationLinks;
  };

  const getPagButtonsFilter = (
	table,
	handlePageChange,
	searchValue
  ) => {
	const totalPages = Math.ceil(table.length / 10);
  
	const paginationLinks = [...Array(totalPages)].map((_, index) => {
	  const handleClick = () => handlePageChange(index + 1);
	  return (
		<Link
		  href={`/vehicles/filter?search=${searchValue}&page=${index+1}`}
		  className={styles.pageButtons}
		  key={index}
		  onClick={handleClick}
		>
		  {index + 1}
		</Link>
	  );
	});
  
	return paginationLinks;
  };
  

const deleteRow = async (id) => {
	const doc1 = await getMakeDocId("MakeID", id);
	const doc2 = await getModelDocId("MakeID", id);
	await deleteMake(doc1);
	await deleteModel(doc2);
};

const getSortedTable = async (dir, table) => {
	try {
		const data = table;
		if (dir === "asc") {
			data.sort((a, b) => a.MakeName.localeCompare(b.MakeName));
		} else {
			data.sort((a, b) => b.MakeName.localeCompare(a.MakeName));
		}

		return data;
	} catch (error) {
		console.error("Error getting sorted vehicles:", error);
		throw error;
	}
};

export {
	deleteRow,
	getFilteredTable,
	getMergedData,
	getPaginatedTable,
	getSortedTable,
	getPaginationButtons,
	getPagButtonsFilter
};
