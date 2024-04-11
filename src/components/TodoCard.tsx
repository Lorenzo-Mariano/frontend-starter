import { useState } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import styles from "../styles/todocard.module.css";

type TodoCardProps = {
	key: string;
	taskId: string;
	title: string;
	description: string;
	onMarkAsDone: () => void;
};

const TodoCard: React.FC<TodoCardProps> = ({
	taskId,
	title,
	description,
	onMarkAsDone,
}) => {
	const [markingAsDone, setMarkingAsDone] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const openEditModal = (id: string): void => {
		console.log(id);
		setOpenModal(true);
	};

	const handleDelete = (id: string): void => {
		console.log("Delete clicked. ID:", id);
		setMarkingAsDone(true);
		axios.delete(`https://localhost:3000/todo/${id}`).then((response) => {
			console.log(response);
			setMarkingAsDone(false);
			onMarkAsDone();
		});
	};

	return (
		<>
			{openModal && (
				<EditModal
					taskId={taskId}
					currentTitle={title}
					currentDesc={description}
					operation={"Edit"}
					onClose={() => {
						setOpenModal(false);
					}}
					onMarkAsDone={onMarkAsDone}
				/>
			)}

			<div className={styles.todoWrapper}>
				{markingAsDone && <span>Marking as done...</span>}
				<section className={styles.details}>
					<span className={styles.title}>{title}</span>
					<div className={styles.description}>{description}</div>
				</section>
				<section className={styles.buttons}>
					<button
						className={`${styles.button} ${styles.edit}`}
						onClick={() => {
							openEditModal(taskId);
						}}
					>
						Edit
					</button>
					<button
						className={`${styles.button} ${styles.finish}`}
						onClick={() => {
							console.log(taskId);
							handleDelete(taskId);
						}}
					>
						Mark as done!
					</button>
				</section>
			</div>
		</>
	);
};

export default TodoCard;
