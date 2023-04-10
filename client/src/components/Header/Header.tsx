import styles from "./Header.module.css";

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}><a href="#">Home</a></li>
            <li className={styles.navItem}><a href="#">About</a></li>
            <li className={styles.navItem}><a href="#">Services</a></li>
            <li className={styles.navItem}><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
    </>
  )
}