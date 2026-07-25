import React from 'react';
import styles from '../styles/layout.module.css';

export type NavLink = { label: string; href: string; id?: string };

type NavbarProps = {
  brand?: { label: string; href?: string };
  links?: NavLink[];
  onToggleSidebar?: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ brand, links = [], onToggleSidebar }) => {
  return (
    <header className={styles.navbar} role="banner">
      <div className={styles.navbarLeft}>
        <button
          aria-label="Toggle sidebar"
          className={styles.hamburger}
          onClick={onToggleSidebar}
        >
          ☰
        </button>
        <a className={styles.brand} href={brand?.href ?? '#'}>{brand?.label ?? 'Project'}</a>
      </div>

      <nav className={styles.topNav} role="navigation" aria-label="Main navigation">
        <ul className={styles.navList}>
          {links.map((l) => (
            <li key={l.href} className={styles.navItem}>
              <a id={l.id} className={styles.navLink} href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
