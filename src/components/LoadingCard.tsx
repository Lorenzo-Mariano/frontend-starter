import styles from "../styles/loadingcard.module.css";

export const LoadingCard = ({ error }: { error: boolean }) => {
	return (
		<div className={styles.card}>
			{error ? (
				<span>Error fetching. Please try again.</span>
			) : (
				<span>Loading...</span>
			)}
		</div>
	);
};
