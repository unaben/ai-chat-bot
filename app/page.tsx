
import Chatbot from "@/components/Chatbot/Chatbot";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Chatbot />
      </div>
    </div>
  );
}
