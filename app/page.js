import Link from "next/link";
import styles from "../app/Components/VehicleList.module.css";


const Home = () => {
	return (
		<div>
			<Link className={styles.toApp} href="/vehicles/pages?page=1">Go To Vehicle App</Link>
			
		</div>
	);
};

export default Home;
