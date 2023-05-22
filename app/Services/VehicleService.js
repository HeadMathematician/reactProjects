import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig"

class VehicleService {
	constructor() {}

	async getAllVehicles() {
		const vehicleCollection = collection(db, "vehicles");
		const querySnapshot = await getDocs(vehicleCollection);
		const vehicles = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return vehicles;
	}

	async createVehicle(vehicleData) {
		const newVehicleRef = await addDoc(collection(db, "vehicles"), vehicleData);
		const newVehicleSnapshot = await getDoc(newVehicleRef);
		return { id: newVehicleSnapshot.id, ...newVehicleSnapshot.data() };
	}

	async updateVehicle(vehicleId, updatedVehicleData) {
		const vehicleDoc = doc(db, "vehicles", vehicleId);
		await updateDoc(vehicleDoc, updatedVehicleData);
		const updatedVehicleSnapshot = await getDoc(vehicleDoc);
		
		return { id: updatedVehicleSnapshot.id, ...updatedVehicleSnapshot.data() };
	}

	async deleteVehicle(vehicleId) {
		const vehicleDoc = doc(db, "vehicles", vehicleId);
		await deleteDoc(vehicleDoc);
	}

	async getVehicle(vehicleId) {
		const vehicleDoc = doc(db, "vehicles", vehicleId);
		const vehicleSnapshot = await getDoc(vehicleDoc);
		if (vehicleSnapshot.exists()) {
			return { id: vehicleSnapshot.id, ...vehicleSnapshot.data() };
		}
		return null;
	}
}

export default VehicleService;
