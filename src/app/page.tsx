import styles from "./page.module.css";
import SignUp from "../Components/SignUp/SignUp";

export default function Home() {
  return (
    <div className={styles.page}>
      <SignUp isOpen={true}/>
    </div>
  );
}

