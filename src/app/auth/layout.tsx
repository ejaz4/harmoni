import styles from "./auth.module.css";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.containerCentre}>{children}</div>;
};

export default AuthenticationLayout;
