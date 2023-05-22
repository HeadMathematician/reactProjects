import { observer } from "mobx-react";
import Link from "next/link";
import styles from "./VehicleTable.module.css";
import { toJS } from "mobx";

const VehicleTable = (props) => {

	return (
		<table className={styles.table}>
			<thead>
				<tr className={styles.th}>
					<th>Make ID</th>
					<th>Model ID</th>
					<th>Make Name</th>
					<th>Make ABRV</th>
					<th>Model Name</th>
					<th>Model ABRV</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{props.paginatedData.map((md) => {
			

					return (
						<tr key={Math.random() * 100} className={styles.td}>
							<td>{md.MakeID}</td>
							<td>{md.ModelID}</td>
							<td>{md.MakeName}</td>
							<td>{md.MakeAbrv}</td>
							<td>{md.ModelName}</td>
							<td>{md.ModelAbrv}</td>
							<td>
								<div>
									<Link
										href={`/vehicles/edit?makeid=${md.MakeID}`}
										className={styles.edit}
									>
										Edit
									</Link>
									<button
										className={styles.dlt}
										onClick={() => props.onDelete(md.MakeID)}
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default observer(VehicleTable);
