import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar, { SidebarItem } from '../components/Sidebar';

type LegacyProps = any;

/**
 * NavbarAdapter
 * - If `LegacyNavbar` is provided it will be rendered with adapted props.
 * - Otherwise the built-in `Navbar` is used.
 */
export const NavbarAdapter: React.FC<{
  LegacyNavbar?: React.ComponentType<LegacyProps>;
  brand?: { label: string; href?: string };
  links?: { label: string; href: string }[];
  onToggleSidebar?: () => void;
}> = ({ LegacyNavbar, brand, links, onToggleSidebar }) => {
  if (LegacyNavbar) {
    // map new API to the legacy shape. Adapt as needed for your legacy component.
    const legacyProps = {
      title: brand?.label ?? 'Project',
      items: (links ?? []).map((l) => ({ text: l.label, url: l.href })),
      onMenuClick: onToggleSidebar,
    };
    // @ts-ignore - allow legacy prop shapes
    return <LegacyNavbar {...legacyProps} />;
  }

  return <Navbar brand={brand} links={links} onToggleSidebar={onToggleSidebar} />;
};

export default NavbarAdapter;
