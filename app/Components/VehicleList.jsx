"use client";

import { observer } from "mobx-react";
import React, { useEffect } from "react";
import VehicleService from "../Services/VehicleService";
import VehicleListStore from "../Stores/VehicleListStore";
import VehicleTable from "./VehicleTable";

const VehicleList = observer(() => {
	const vehicleService = new VehicleService();
	const { vehicles, setVehicles, currentPage, setCurrentPage } = VehicleListStore;	

	useEffect(() => {
		const fetchVehicles = async () => {
			const vehicles = await vehicleService.getAllVehicles();
			setVehicles(vehicles);
		};

		fetchVehicles();
	}, []);

	const deleteVehicle = async (id) => {
		if (window.confirm("Are you sure you want to delete this vehicle?")) {
			await vehicleService.deleteVehicle(id);
			setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
		}
	};

	//pagination
	const vehiclesPerPage = 10;
	const lastVehicleIndex = currentPage * vehiclesPerPage;
  	const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage;
  	const currentVehicles = vehicles.slice(firstVehicleIndex, lastVehicleIndex);

	return (
		<div>
			<VehicleTable vehicles={vehicles} deleteVehicle={deleteVehicle} />
		</div>
	);
});

export default VehicleList;
