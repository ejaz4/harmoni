import { redirect, useRouter } from "next/navigation";

const AuthenticationPage = () => {
	redirect("/auth/login");
};

export default AuthenticationPage;
