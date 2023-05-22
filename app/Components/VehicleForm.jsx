"use client";

import React from "react";
import VehicleService from "../Services/VehicleService";
import VehicleFormStore from "../Stores/VehicleFormStore";
import styles from "./VehicleForm.module.css";
import { observer } from "mobx-react";
import Link from "next/link";
import { createModel } from "../Services/VehicleModelService";
import { createMake } from "../Services/VehicleMakeService";


const VehicleForm = (props) => {
	const vehicleService = new VehicleService();
	const { modelName, makeName, modelAbrv, makeAbrv, setMakeAbrv, 
	setMakeName, setModelAbrv, setModelName } = VehicleFormStore;

	const makeNameChangeHandler = (event) => {
		setMakeName(event.target.value);
	};

	const makeAbrvChangeHandler = (event) => {
		setMakeAbrv(event.target.value);
	};

	const modelNameChangeHandler = (event) => {
		setModelName(event.target.value);
	};

	const modelAbrvChangeHandler = (event) => {
		setModelAbrv(event.target.value);
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const MAKE_ID = Math.round(Math.random() * 100000).toString();
		const MODEL_ID = Math.round(Math.random() * 1000).toString();

        const vehicleMakeData = {
			MakeID: MAKE_ID,
			MakeName: makeName,
			MakeAbrv: makeAbrv
		}

		const vehicleModelData = {
			MakeID: MAKE_ID,
			ModelID: MODEL_ID,
			ModelName: modelName,
			ModelAbrv: modelAbrv,
		}

        if (makeName.trim().length < 1 || makeAbrv.trim().length < 1 
			|| modelName.trim().length < 1 || modelAbrv.trim().length < 1) {
            alert('Please enter a valid input');
            return;
          }

		await createMake(vehicleMakeData);
		await createModel(vehicleModelData);
        
        window.location.href = '/vehicles/pages?page=1';
	};

	return (
		<div className={styles.editContainer}>
			<form onSubmit={submitHandler} className={styles.form}>
				<label>Vehicle Make Name: </label>
				<input type="text" value={makeName} onChange={makeNameChangeHandler} />

				<label>Vehicle Make Abrv: </label>
				<input type="text" value={makeAbrv} onChange={makeAbrvChangeHandler} />

				<label>Vehicle Model Name: </label>
				<input type="text" value={modelName} onChange={modelNameChangeHandler} />

				<label>Vehicle Model Abrv: </label>
				<input type="text" value={modelAbrv} onChange={modelAbrvChangeHandler} />

                <div className={styles.btnContainer}>
				    <button type="submit" className={styles.submit}>Add Vehicle</button>
                    <Link href="/vehicles"className={styles.cancel}>Cancel</Link>
                </div>
			</form>
		</div>
	);
};

export default observer(VehicleForm);
