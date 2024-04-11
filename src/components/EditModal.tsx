import { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TodoForm, { TodoData } from "./TodoForm";
import styles from "../styles/editmodal.module.css";

type EditModalProps = {
	taskId: string;
	currentTitle: string;
	currentDesc: string;
	operation: string;
	onClose: () => void;
	onMarkAsDone: () => void;
};

const EditModal: React.FC<EditModalProps> = ({
	taskId,
	currentTitle,
	currentDesc,
	operation,
	onClose,
	onMarkAsDone,
}) => {
	const [formState, setFormState] = useState({
		missingInput: false,
		success: false,
		isSubmitting: false,
		submissionFailed: false,
	});

	const portal = document.getElementById("portal");
	if (!portal) {
		return null;
	}

	const handleSubmit = async (input: TodoData): Promise<void> => {
		setFormState((prev) => ({
			...prev,
			isSubmitting: true,
		}));

		await axios
			.put(`https://localhost:3000/todo/${input.id}`, {
				title: input.title,
				description: input.description,
			})
			.then((response) => {
				console.log(response);
				onMarkAsDone();
			});

		setFormState((prev) => ({
			...prev,
			isSubmitting: false,
		}));

		onClose();
	};

	return ReactDOM.createPortal(
		<>
			<div
				className={styles.shadow}
				onClick={() => {
					onClose();
				}}
			></div>
			<div className={styles.hero}>
				<TodoForm
					id={taskId}
					currentTitle={currentTitle}
					currentDesc={currentDesc}
					operation={operation}
					onEdit={handleSubmit}
					formState={formState}
				/>
			</div>
		</>,
		portal
	);
};

export default EditModal;
