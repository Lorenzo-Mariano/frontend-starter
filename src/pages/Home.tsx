import { useState, useEffect } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";
import TodoCard from "../components/TodoCard";
import { LoadingCard } from "../components/LoadingCard";
import { TodoData } from "../components/TodoForm";

const ShowTodos = () => {
	const [todos, setTodos] = useState([]);
	const [fetchError, setFetchError] = useState(false);
	const [refresh, setRefresh] = useState(false);

	axiosRetry(axios, {
		retries: 3,
		onRetry: () => {
			console.log("Retrying with axios-retry");
		},
		onMaxRetryTimesExceeded: () => {
			setFetchError(true);
		},
	});

	const handleRefresh = () => {
		setRefresh((prev) => !prev);
	};

	useEffect(() => {
		const fetchTodos = async () => {
			await axios
				.get("https://localhost:3000/todo")
				.then((res) => {
					console.log(res);
					setTodos(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		fetchTodos();
	}, [refresh]);

	return (
		<section>
			{todos.length ? (
				todos.map((todo: TodoData) => (
					<TodoCard
						key={todo.id}
						taskId={todo.id}
						title={todo.title}
						description={todo.description}
						onMarkAsDone={handleRefresh}
					/>
				))
			) : (
				<LoadingCard error={fetchError} />
			)}
		</section>
	);
};

export default ShowTodos;
