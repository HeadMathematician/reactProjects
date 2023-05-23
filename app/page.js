import Link from "next/link";
import styles from "./frontPage.module.css"

const Home = () => {
	return (
		<div>
			<Link className={styles.toApp}  href="/vehicles">Go To Vehicle App</Link>
			
		</div>
	);
};

export default Home;
