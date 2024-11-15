'use client'

import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link href="/" className={styles.navbarLogo}>
                    WordWeave
                </Link>

                <ul className={`${styles.navMenu}`}>
                    <li className={styles.navItem}>
                        <Link href="/" className={styles.navLinks}>
                            Home
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/account" className={styles.navLinks}>
                            My Account
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/about" className={styles.navLinks}>
                            About
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/help" className={styles.navLinks}>
                            Help
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;