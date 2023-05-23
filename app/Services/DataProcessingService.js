import { collection, getDocs, query, orderBy, limit, startAt, startAfter, getDoc, doc} from "firebase/firestore";
import { db } from "./firebaseConfig";

import { getDocumentById, updateDocument } from "./MainService";
import { deleteMake, getMakeDocId } from "../Services/VehicleMakeService";
import { deleteModel, getModelDocId } from "../Services/VehicleModelService";
import { deleteMerged, getMergedDocID, getMerged } from "./VehicleMergedService";

import styles from "../Components/VehicleTable.module.css";

import Link from "next/link";

const countRef = "SnisbxjkwINE3nl7Nqa8"

const getFilteredTable = async (currentPage, value) => {
	try {
		if(value == ""){
			const response = await fetch(`http://localhost:8080/paginateData?pageSize=${10}&page=${currentPage}&sortBy=asc`);
			const data = await response.json();
			return data.length;
		}
		else{
			const allData = await getMerged();
			const filteredData = allData.filter((doc) => 
			doc.MakeName.toLowerCase().includes(value.toLowerCase()) 
		);
		return filteredData.length;
		}
		
	} catch (error) {
		console.error("Error filtering vehicles:", error);
		throw error;
	}
};

const getPaginationButtons = (
	number,
	handlePageChange
  ) => {
	
	const totalPages = Math.ceil(number / 10);
  
	const paginationLinks = [...Array(totalPages)].map((_, index) => {
	  const handleClick = () => handlePageChange(index + 1);
	  return (
		<button
		  
		  className={styles.pageButtons}
		  key={index}
		  onClick={handleClick}
		>
		  {index + 1}
		</button>
	  );
	});
  
	return paginationLinks;
  };

  const getPagButtonsFilter = (
	number,
	handlePageChange,
	searchValue
  ) => {
	const totalPages = Math.ceil(number / 10);
  
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
	const doc3 = await getMergedDocID("MakeID", id);
	await deleteMake(doc1);
	await deleteModel(doc2);
	await deleteMerged(doc3);
};

const getNumberOfRows = async () => {
	const number = await getDocumentById("VehicleCount", countRef);
	return number.NumberOfRows;
}

const updateNumberOfRows = async (number) => {
	await updateDocument("VehicleCount", countRef, {NumberOfRows: number})
}

export {
	deleteRow,
	getFilteredTable,
	getPaginationButtons,
	getPagButtonsFilter,
	getNumberOfRows,
	updateNumberOfRows,
};
