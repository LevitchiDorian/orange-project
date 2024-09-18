
import styles from './Header.module.css'

export const Header = () =>{
    return <header className={styles.header}>
        <nav className={styles.navbar}>
            <h1>Logo</h1>
            <ul className={styles.navbarList}>
                <li>Rezervations</li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
        </nav>
    </header>
}