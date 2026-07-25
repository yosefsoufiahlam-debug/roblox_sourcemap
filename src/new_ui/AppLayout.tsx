import React, { useCallback, useState } from 'react';
import NavbarAdapter from './adapters/NavbarAdapter';
import SidebarAdapter from './adapters/SidebarAdapter';
import styles from './styles/layout.module.css';

const sampleLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Maps', href: '#maps' },
  { label: 'Search', href: '#search' },
];

const sampleSidebar = [
  { label: 'Home', href: '#home' },
  {
    label: 'Source maps',
    children: [
      { label: 'By file', href: '#by-file' },
      { label: 'By module', href: '#by-module' },
    ],
  },
  { label: 'Settings', href: '#settings' },
];

export const AppLayout: React.FC<{
  LegacyNavbar?: React.ComponentType<any>;
  LegacySidebar?: React.ComponentType<any>;
}> = ({ LegacyNavbar, LegacySidebar, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = useCallback(() => setSidebarOpen((s) => !s), []);

  const handleNavigate = useCallback((href?: string) => {
    console.log('navigate to', href);
  }, []);

  return (
    <div className={styles.app}>
      <NavbarAdapter
        LegacyNavbar={LegacyNavbar}
        brand={{ label: 'RBX SourceMap' }}
        links={sampleLinks}
        onToggleSidebar={toggleSidebar}
      />

      <div className={styles.body}>
        <div className={sidebarOpen ? styles.sidebarWrapper : styles.sidebarWrapperHidden}>
          <SidebarAdapter LegacySidebar={LegacySidebar} items={sampleSidebar} onNavigate={handleNavigate} />
        </div>

        <main className={styles.main} id="maincontent" role="main">
          {children ?? (
            <div style={{ padding: 20 }}>
              <h1>RBX Source Map Viewer</h1>
              <p>Replace this with your UI for mapping, file lists, etc.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
