import React from "react";

import VehicleForm from "@/app/Components/VehicleForm";

const Create = () => {

    const vehicleFormCancelHandler = () => {
		return;
	};

    return <div>
        <VehicleForm cancel={vehicleFormCancelHandler} />
    </div>
}


export default Create;