import { useEffect, useState } from "react";
import styles from "../styles/todoform.module.css";

export type FormState = {
	missingInput: boolean;
	success: boolean;
	isSubmitting: boolean;
	submissionFailed: boolean;
};

export type TodoData = {
	id: string;
	title: string;
	description: string;
};

export type CreateTodoData = {
	title: string;
	description: string;
};

type TodoFormProps = {
	id?: string;
	currentTitle?: string;
	currentDesc?: string;
	operation: string;
	onCreate?: (input: CreateTodoData) => Promise<void>;
	onEdit?: (input: TodoData) => Promise<void>;
	formState: FormState;
};

const TodoForm: React.FC<TodoFormProps> = ({
	id,
	currentTitle,
	currentDesc,
	operation,
	onCreate,
	onEdit,
	formState,
}) => {
	const [error, setError] = useState(false);
	const [input, setInput] = useState({ title: "", description: "" });

	useEffect(() => {
		if (currentTitle && currentDesc) {
			setInput({ title: currentTitle, description: currentDesc });
		}
	}, [currentTitle, currentDesc]);

	const validateInput = (input: CreateTodoData) => {
		if (!input.title || !input.description) {
			setError(true);
			return false;
		}

		console.log(input);

		if (operation === "Create" && onCreate) {
			onCreate(input);
		} else if (operation === "Edit" && onEdit && id) {
			onEdit({ ...input, id: id });
		}
	};
	return (
		<div className={styles.formWrapper}>
			<h1>{operation} Todo</h1>
			<form className={styles.form}>
				{error && (
					<span className={styles.error}>
						Make sure to enter a title and description.
					</span>
				)}

				{formState.success && (
					<span className={styles.success}>Added todo!</span>
				)}

				{formState.isSubmitting && (
					<span className="submitting">Adding todo...</span>
				)}

				<input
					className={`${styles.input} ${styles.title}`}
					type="text"
					placeholder={"Title..."}
					value={input.title}
					onChange={(e) => {
						setInput({ ...input, title: e.target.value });
					}}
				/>
				<textarea
					className={`${styles.input} ${styles.description}`}
					placeholder="Description..."
					value={input.description}
					onChange={(e) => {
						setInput({ ...input, description: e.target.value });
					}}
				/>
			</form>
			<section className={styles.buttons}>
				<button className={`${styles.button} ${styles.reset}`}>Reset</button>
				<button
					className={`${styles.button} ${styles.add}`}
					onClick={() => {
						validateInput(input);
					}}
				>
					Add
				</button>
			</section>
		</div>
	);
};

export default TodoForm;
