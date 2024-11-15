import styles from "./page.module.css";
import SignUp from "../Components/SignUp/SignUp";
import Navbar from "../Components/Navbar/Navbar";

export default function Home() {
  

  return (
    <div className={styles.page}>
      <Navbar />
      <SignUp />
    </div>
  );
}

