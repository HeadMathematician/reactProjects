import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from './VehicleForm.module.css';
import Link from 'next/link';
import { getMakeDocId, getMakeById, updateMake } from '../Services/VehicleMakeService';
import { getModelDocId, getModelById, updateModel } from '../Services/VehicleModelService';
import VehicleEditStore from '../Stores/VehicleEditStore';

const VehicleEdit = () => {
  
  const { modelName, makeName, modelAbrv, makeAbrv, makeDocRef, modelDocRef, setMakeAbrv, 
    setMakeName, setModelAbrv, setModelName, setMakeDocRef, setModelDocRef } = VehicleEditStore;

  useEffect(() => {
    
    
    const fetch = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const MAKE_ID = urlParams.get("makeid")
        const makeDocId = await getMakeDocId("MakeID", MAKE_ID);
        const fullMakeDoc = await getMakeById(makeDocId);
        const modelDocId = await getModelDocId("MakeID", MAKE_ID);
        const fullModelDoc = await getModelById(modelDocId);
        
        setMakeDocRef(makeDocId);
        setModelDocRef(modelDocId);
        setMakeName(fullMakeDoc.MakeName);
        setMakeAbrv(fullMakeDoc.MakeAbrv);
        setModelName(fullModelDoc.ModelName);
        setModelAbrv(fullModelDoc.ModelAbrv);

       
        
      } catch (error) {
        console.error('Error while fetching :', error);
      }
    };

   fetch()
    
  }, [ setMakeName, setMakeAbrv, setModelName, setModelAbrv]);

  const updateVehicle = async (event) => {
    event.preventDefault();

    try {
      const makeData = {
        MakeName: makeName,
        MakeAbrv: makeAbrv,
      };
      const modelData = {
        ModelName: modelName,
        ModelAbrv: modelAbrv
      }

      if (makeName.trim().length < 1 || makeAbrv.trim().length < 1
          || modelName.trim().length < 1 || modelAbrv.trim().length < 1) {
        alert('Please enter a valid input');
        return;
      } 

      await updateMake(makeDocRef, makeData);
      await updateModel(modelDocRef, modelData);

      
    } catch (error) {
      console.error('Error while updating vehicle: ', error);
    }
    window.location.href = '/vehicles';

  };

  return (
    <div className={styles.editContainer}>
      <form className={styles.form} onSubmit={updateVehicle}>
        <label>Edit Vehicle Make Name: </label>
        <input
          type="text"
          value={makeName}
          onChange={(e) => setMakeName(e.target.value)}
        />
        <label>Edit Vehicle Make ABRV: </label>
        <input
          type="text"
          value={makeAbrv}
          onChange={(e) => setMakeAbrv(e.target.value)}
        />
        <label>Edit Vehicle Model Name: </label>
        <input
          type="text"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
        />
        <label>Edit Vehicle Model ABRV: </label>
        <input
          type="text"
          value={modelAbrv}
          onChange={(e) => setModelAbrv(e.target.value)}
        />
        <div className={styles.btnContainer}>
          <button className={styles.submit} type="submit">
            Save
          </button>
          <Link href="/vehicles" className={styles.cancel}>
            Cancel
          </Link>
        </div>
        </form>
        </div>
  );
};

export default observer(VehicleEdit);
