import { useState } from "react";
import axios from "axios";
import TodoForm, { CreateTodoData } from "../components/TodoForm";

const CreateTodo = () => {
	const [submission, setSubmission] = useState({
		missingInput: false,
		success: false,
		isSubmitting: false,
		submissionFailed: false,
	});

	const handleSubmit = async (input: CreateTodoData): Promise<void> => {
		setSubmission((prev) => ({
			...prev,
			isSubmitting: true,
			missingInput: false,
		}));

		console.log(input);

		await axios
			.post("https://localhost:3000/todo", {
				title: input.title,
				description: input.description,
			})
			.then((response) => {
				console.log(response);
				setSubmission((prev) => ({
					...prev,
					isSubmitting: false,
					success: true,
				}));
			})
			.catch((error) => {
				console.log(error);
				setSubmission((prev) => ({
					...prev,
					isSubmitting: false,
					success: false,
				}));
			});
	};

	return (
		<TodoForm
			operation={"Create"}
			onCreate={handleSubmit}
			formState={submission}
		/>
	);
};

export default CreateTodo;
