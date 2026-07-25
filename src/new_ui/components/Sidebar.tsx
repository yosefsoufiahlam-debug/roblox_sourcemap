import React, { useEffect, useState } from 'react';
import styles from '../styles/layout.module.css';

export type SidebarItem = {
  id?: string;
  label: string;
  href?: string;
  children?: SidebarItem[];
};

type SidebarProps = {
  items: SidebarItem[];
  initialCollapsed?: boolean;
  onNavigate?: (href?: string) => void;
};

const COLLAPSE_KEY = 'app.sidebar.collapsed';

export const Sidebar: React.FC<SidebarProps> = ({ items, initialCollapsed = false, onNavigate }) => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(COLLAPSE_KEY);
      return saved ? JSON.parse(saved) : initialCollapsed;
    } catch {
      return initialCollapsed;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, JSON.stringify(collapsed));
    } catch {
      // ignore
    }
  }, [collapsed]);

  const handleKeyNav = (e: React.KeyboardEvent, href?: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (href) {
        onNavigate?.(href);
        window.location.href = href;
      }
    } else if (e.key === 'ArrowRight' && collapsed) {
      setCollapsed(false);
    } else if (e.key === 'ArrowLeft' && !collapsed) {
      setCollapsed(true);
    }
  };

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}
      role="navigation"
      aria-label="Sidebar"
    >
      <div className={styles.sidebarHeader}>
        <button
          aria-pressed={collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed((c) => !c)}
          className={styles.collapseBtn}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <ul className={styles.sidebarList}>
        {items.map((it) => (
          <li key={it.label} className={styles.sidebarItem}>
            <a
              id={it.id}
              tabIndex={0}
              href={it.href ?? '#'}
              className={styles.sidebarLink}
              onKeyDown={(e) => handleKeyNav(e, it.href)}
              onClick={() => onNavigate?.(it.href)}
            >
              <span className={styles.sidebarLabel}>{it.label}</span>
            </a>

            {it.children && it.children.length > 0 && (
              <ul className={styles.sidebarSubList}>
                {it.children.map((c) => (
                  <li key={c.label}>
                    <a
                      tabIndex={0}
                      href={c.href ?? '#'}
                      className={styles.sidebarSublink}
                      onKeyDown={(e) => handleKeyNav(e, c.href)}
                      onClick={() => onNavigate?.(c.href)}
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
