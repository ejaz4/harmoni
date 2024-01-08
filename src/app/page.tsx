import "react-loading-skeleton/dist/skeleton.css";
import { redirect } from "next/navigation";

export default function Home() {
	redirect("/web/home");
}
