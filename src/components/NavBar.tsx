import { NavLink } from "react-router-dom";
import styles from "../styles/navbar.module.css";

const NavBar = () => {
	return (
		<nav className={styles.nav}>
			<NavLink className={styles.link} to={"/"}>
				Home
			</NavLink>
			<NavLink className={styles.link} to={"/create-todo"}>
				Create Todo
			</NavLink>
		</nav>
	);
};

export default NavBar;
