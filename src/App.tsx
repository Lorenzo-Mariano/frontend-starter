import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import ShowTodos from "./pages/Home";
import CreateTodo from "./pages/CreateTodo";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{ path: "/", element: <ShowTodos /> },
			{ path: "/create-todo", element: <CreateTodo /> },
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
